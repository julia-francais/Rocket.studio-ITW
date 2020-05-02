
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.21.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    //Exercice 1

    // We write the function to get the carb quantity per module
    const getCarb = (n) => Math.floor(n / 3) - 2;

    // We create a function that transforms our initial string into an array of numbers
    const convertStringToArrayOfNumbers = (string) => {
      let numberArray = [];
      const stringArray = string.split(" ");
      //we map through the first string array to convert each value into number and add it to the second array
      stringArray.map((module) => {
        numberArray.push(Number(module));
      });
      return numberArray;
    };

    const getSumFromArray = (modules, calculateCarb) => {
      //we initialize a new constant that will store the total sum of the carb needed with an initial value of 0
      let total = 0;

      // we map through the modules array to get the carb needed per module and add each value to totalCarbSum
      modules.map((module) => {
        const carbNeeded = calculateCarb(module);
        total += carbNeeded;
      });
      return total;
    };

    // We write the function to get the precise fuel quantity per module needed, taking into account the fuel mass itself
    const getTotalCarbPerModule = (mass) => {
      // We initialize a new variable that will store the total sum of fuel needed per module, with a value of 0
      let totalCarbNeededPerModule = 0;
      let carbNeeded = getCarb(mass);
      // add a comment
      while (carbNeeded >= 0) {
        totalCarbNeededPerModule += carbNeeded;
        carbNeeded = getCarb(carbNeeded);
      }
      return totalCarbNeededPerModule;
    };

    //=======================================================================================================================
    //Exercice 2

    // We create a function that converts the string positions to an array of objects containing each movement
    const convertPosition = (string) => {
      const stringArray = string.split(",");
      let x = 0,
        y = 0;
      const positionArray = [{ x, y }];
      // We find out the position of each movement by checking out the first letter
      stringArray.map((string) => {
        switch (string.charAt(0)) {
          case "D":
            x += Number(string.slice(1));
            positionArray.push({ x, y });
            break;
          case "G":
            x -= Number(string.slice(1));
            positionArray.push({ x, y });

            break;
          case "H":
            y += Number(string.slice(1));
            positionArray.push({ x, y });

            break;
          case "B":
            y -= Number(string.slice(1));
            positionArray.push({ x, y });

            break;
        }
      });
      return positionArray;
    };

    // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
    // Determine the intersection point of two line segments
    // Return FALSE if the lines don't intersect
    const checkIntersections = (p1, p2, p3, p4) => {
      const { x: x1, y: y1 } = p1;
      const { x: x2, y: y2 } = p2;
      const { x: x3, y: y3 } = p3;
      const { x: x4, y: y4 } = p4;

      // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false;
      }

      let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

      // Lines are parallel
      if (denominator === 0) {
        return false;
      }

      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

      // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false;
      }

      // Return a object with the x and y coordinates of the intersection
      let x = x1 + ua * (x2 - x1);
      let y = y1 + ua * (y2 - y1);

      return { x, y };
    };

    //We create a function that will loop through two arrays of positions, we compare each position using the previous function and we return an array containing all the intersection points
    const checkPositions = (arr1, arr2) => {
      const intersections = [];
      // We check which is the longest array to use it in the larger loop
      const longerArray = arr1.length >= arr2.length ? arr1 : arr2;
      const shorterArray = arr1.length >= arr2.length ? arr2 : arr1;

      for (let i = 0; i < longerArray.length - 1; i++) {
        for (let j = 0; j < shorterArray.length - 1; j++) {
          // We compare the origin and the ending points of the two segments using the previous function
          const intersectionPos = checkIntersections(
            longerArray[i],
            longerArray[i + 1],
            shorterArray[j],
            shorterArray[j + 1]
          );
          // If we find an intersection we save it in the intersections array initialized earlier
          if (intersectionPos !== false) {
            intersections.push(intersectionPos);
          }
        }
      }
      return intersections;
    };

    // We create a function that calculates the manhattan distance between two positions
    const manhattanDistance = (p1, p2) => {
      const result = Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
      return result;
    };

    //We convert calculate the manhattan distance of each intersection found previously, store it in an array and return the minimum value.
    const getClosestIntersection = (positionArr) => {
      let distanceArr = [];
      positionArr.map((pos) => {
        const originPos = { x: 0, y: 0 };
        distanceArr.push(manhattanDistance(originPos, pos));
      });
      return Math.min(...distanceArr);
    };

    //Exercice 1
    // we put all the modules in a string
    const modulesString =
      "88623 101095 149899 89383 54755 73496 115697 99839 65903 140201 95734 144728 113534 82199 98256 107126 54686 61243 54763 119048 58863 134097 84959 130490 145813 115794 130398 69864 133973 58382 75635 77153 132645 91661 126536 118977 137568 100341 142080 63342 84557 51961 61956 87922 92488 107572 51373 70148 80672 134880 105721 100138 80394 145117 50567 122606 112408 110737 111521 144309 65761 113147 58920 96623 65479 66576 94244 64493 142334 65969 99461 143656 134661 90115 122994 66994 135658 134336 102958 111410 107930 54711 101397 111350 86453 134383 134276 130342 80522 64875 68182 83400 121302 105996 123580 130373 123987 107932 78930 132068";
    const fil1 =
      "D997,B443,G406,B393,G66,B223,D135,H452,G918,H354,G985,B402,D257,H225,D298,H369,G762,B373,D781,B935,D363,H952,G174,B529,G127,B549,D874,B993,G890,H881,D549,H537,G174,H766,D244,H131,D861,B487,D849,H304,G653,B497,G711,B916,D12,B753,D19,B528,G944,B155,G507,H552,D844,B822,D341,H948,G922,H866,D387,H973,D534,H127,D48,H744,D950,H522,D930,H320,D254,B577,G142,B29,G24,B118,G583,B683,G643,H974,G683,H985,D692,B271,G279,H62,D157,B932,G556,H574,D615,B428,D296,H551,G452,H533,D475,B302,D39,H846,D527,B433,G453,B567,D614,H807,D463,H712,G247,B436,D141,H180,D783,B65,G379,B935,D989,H945,G901,B160,D356,B828,D45,B619,D655,H104,D37,H793,G360,B242,G137,B45,G671,B844,D112,H627,D976,H10,D942,H26,G470,B284,D832,B59,D97,B9,G320,B38,D326,H317,G752,H213,D840,H789,G152,B64,G628,H326,G640,B610,G769,H183,D844,H834,D342,H630,G945,B807,G270,B472,D369,B920,D283,H440,G597,H137,G133,H458,D266,H91,D137,H536,D861,B325,D902,B971,D891,H648,G573,H139,D951,B671,D996,H864,G749,B681,D255,H306,D154,H706,G817,B798,D109,B594,D496,B867,G217,B572,G166,H723,D66,B210,D732,B741,G21,B574,G523,B646,D313,B961,G474,H990,D125,H928,G58,H726,D200,B364,D244,H622,D823,H39,D918,H549,D667,H935,D372,H241,G56,B713,G735,H735,G812,H700,G408,H980,G242,B697,G580,B34,G266,H190,D876,H857,G967,H493,D871,H563,G241,B636,G467,B793,D304,H103,G950,B503,D487,B868,G358,B747,G338,B273,G485,B686,G974,B724,G534,H561,D729,B162,D731,B17,D305,H712,D472,B158,D921,H827,G944,B303,G526,B782,D575,H948,G401,B142,G48,H766,D799,B242,D821,H673,G120";
    const fil2 =
      "G991,B492,G167,B678,G228,H504,D972,H506,D900,H349,D329,B802,D616,H321,D252,H615,D494,H577,D322,B593,D348,H140,G676,H908,G528,B247,G498,B79,G247,B432,G569,H206,G668,B269,G25,H180,D181,B268,D655,B346,D716,H240,G227,B239,G223,H760,G10,B92,G633,B425,D198,H222,G542,B790,G596,H667,G87,B324,D456,H366,D888,H319,D784,B948,D641,B433,G519,H950,G689,B601,G860,H233,D21,B214,G89,H756,G361,H258,G950,B483,D252,H206,G184,H574,G540,H926,D374,H315,D357,H512,D503,H917,D745,B809,G94,B209,D616,H47,D61,B993,G589,B1,D387,B731,D782,H771,G344,H21,G88,H614,D678,H259,G311,B503,G477,H829,D861,B46,D738,B138,G564,B279,G669,H328,G664,H720,G746,H638,D790,B242,D504,B404,D409,B753,G289,H128,G603,B696,G201,B638,G902,B279,G170,B336,G311,H683,G272,H396,D180,B8,D816,B904,G129,B809,D168,B655,G459,B545,G839,H910,G642,H704,D301,B235,D469,B556,G624,B669,G174,B272,D515,B60,G668,H550,G903,B881,G600,B734,D815,H585,D39,B87,D198,B418,G150,B964,G818,B250,G198,B127,D521,H478,G489,B676,G84,H973,D384,B167,D372,B981,G733,B682,D746,B803,G834,B421,D153,H752,G381,B990,D216,H469,G446,B763,D332,B813,G701,H872,G39,B524,G469,H508,G700,B382,G598,H563,D652,B901,D638,B358,G486,B735,G232,H345,D746,H818,G13,H618,D881,B647,D191,H652,D358,H423,G137,B224,D415,H82,D778,B403,D661,B157,D393,B954,G308,B986,G293,H870,D13,H666,G232,H144,D887,H364,G507,H520,D823,B11,G927,B904,D618,H875,D143,B457,D459,B755,D677,B561,G499,H267,G721,H274,G700,B870,G612,B673,G811,B695,D929,B84,G578,H201,G745,H963,G185,B687,G662,H313,G853,H314,D336";

    /* src/App.svelte generated by Svelte v3.21.0 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let div0;
    	let h30;
    	let t3;
    	let hr0;
    	let t4;
    	let ul0;
    	let li0;
    	let h40;
    	let t6;
    	let p0;
    	let t7;
    	let span0;
    	let t9;
    	let t10;
    	let li1;
    	let h41;
    	let t12;
    	let p1;
    	let t13;
    	let span1;
    	let t15;
    	let t16;
    	let div1;
    	let h31;
    	let t18;
    	let hr1;
    	let t19;
    	let ul1;
    	let li2;
    	let h42;
    	let t21;
    	let p2;
    	let t22;
    	let span2;
    	let t24;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Rocket Studio - JS interview / Julia Francais";
    			t1 = space();
    			div0 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Exercice A";
    			t3 = space();
    			hr0 = element("hr");
    			t4 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			h40 = element("h4");
    			h40.textContent = "Quelle est la somme des besoins en carburant pour tous les modules de\n          notre fusée ?";
    			t6 = space();
    			p0 = element("p");
    			t7 = text("La somme des besoins en carburant pour tous les modules de notre fusée\n          est de\n          ");
    			span0 = element("span");
    			span0.textContent = `${/*totalCarb*/ ctx[0].toLocaleString()}`;
    			t9 = text("\n          .");
    			t10 = space();
    			li1 = element("li");
    			h41 = element("h4");
    			h41.textContent = "Quelle est la somme des besoins en carburant de tous les modules de\n          notre fusée en tenant compte également de la masse du carburant ajouté\n          ?";
    			t12 = space();
    			p1 = element("p");
    			t13 = text("La somme des besoins en carburant de tous les modules de notre fusée,\n          en tenant compte de la masse du carburant ajouté est de\n          ");
    			span1 = element("span");
    			span1.textContent = `${/*realTotalCarb*/ ctx[1].toLocaleString()}`;
    			t15 = text("\n          .");
    			t16 = space();
    			div1 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Exercice B";
    			t18 = space();
    			hr1 = element("hr");
    			t19 = space();
    			ul1 = element("ul");
    			li2 = element("li");
    			h42 = element("h4");
    			h42.textContent = "Quelle est la distance de Manhattan entre le port central et\n          l'intersection la plus proche ?";
    			t21 = space();
    			p2 = element("p");
    			t22 = text("La distance de Manhattan entre le port central et l'intersection la\n          plus proche est de\n          ");
    			span2 = element("span");
    			span2.textContent = `${/*closestIntersection*/ ctx[2]}`;
    			t24 = text("\n          .");
    			attr_dev(h1, "class", "svelte-if326");
    			add_location(h1, file, 77, 2, 1923);
    			add_location(h30, file, 79, 4, 2007);
    			add_location(hr0, file, 80, 4, 2031);
    			add_location(h40, file, 83, 8, 2083);
    			attr_dev(span0, "class", "response svelte-if326");
    			add_location(span0, file, 90, 10, 2326);
    			add_location(p0, file, 87, 8, 2214);
    			add_location(li0, file, 82, 6, 2070);
    			add_location(h41, file, 95, 8, 2441);
    			attr_dev(span1, "class", "response svelte-if326");
    			add_location(span1, file, 103, 10, 2799);
    			add_location(p1, file, 100, 8, 2639);
    			add_location(li1, file, 94, 6, 2428);
    			attr_dev(ul0, "class", "question");
    			add_location(ul0, file, 81, 4, 2042);
    			attr_dev(div0, "class", "exercise svelte-if326");
    			add_location(div0, file, 78, 2, 1980);
    			add_location(h31, file, 110, 4, 2947);
    			add_location(hr1, file, 111, 4, 2971);
    			add_location(h42, file, 115, 8, 3024);
    			attr_dev(span2, "class", "response svelte-if326");
    			add_location(span2, file, 122, 10, 3285);
    			add_location(p2, file, 119, 8, 3164);
    			add_location(li2, file, 114, 6, 3011);
    			attr_dev(ul1, "class", "question");
    			add_location(ul1, file, 113, 4, 2983);
    			attr_dev(div1, "class", "exercise svelte-if326");
    			add_location(div1, file, 109, 2, 2920);
    			attr_dev(main, "class", "svelte-if326");
    			add_location(main, file, 76, 0, 1914);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			append_dev(main, div0);
    			append_dev(div0, h30);
    			append_dev(div0, t3);
    			append_dev(div0, hr0);
    			append_dev(div0, t4);
    			append_dev(div0, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, h40);
    			append_dev(li0, t6);
    			append_dev(li0, p0);
    			append_dev(p0, t7);
    			append_dev(p0, span0);
    			append_dev(p0, t9);
    			append_dev(ul0, t10);
    			append_dev(ul0, li1);
    			append_dev(li1, h41);
    			append_dev(li1, t12);
    			append_dev(li1, p1);
    			append_dev(p1, t13);
    			append_dev(p1, span1);
    			append_dev(p1, t15);
    			append_dev(main, t16);
    			append_dev(main, div1);
    			append_dev(div1, h31);
    			append_dev(div1, t18);
    			append_dev(div1, hr1);
    			append_dev(div1, t19);
    			append_dev(div1, ul1);
    			append_dev(ul1, li2);
    			append_dev(li2, h42);
    			append_dev(li2, t21);
    			append_dev(li2, p2);
    			append_dev(p2, t22);
    			append_dev(p2, span2);
    			append_dev(p2, t24);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	const modulesNumberArray = convertStringToArrayOfNumbers(modulesString);
    	const totalCarb = getSumFromArray(modulesNumberArray, getCarb);
    	console.log("Exercice A - Question 1 : totalCarb", totalCarb);

    	//========================================================***************===========================================================
    	//Question 2
    	//We call the previous function with our modules array and the new function that calculates the total carb needed
    	const realTotalCarb = getSumFromArray(modulesNumberArray, getTotalCarbPerModule);

    	console.log("Exercice A - Question 2 : realTotalCarb", realTotalCarb);

    	//========================================================***************===========================================================
    	//Exercice 2
    	const positionArray1 = convertPosition(fil1);

    	const positionArray2 = convertPosition(fil2);
    	const intersections = checkPositions(positionArray1, positionArray2);

    	//We remove the first element of the intersection which consists in the origin position.
    	intersections.shift();

    	const closestIntersection = getClosestIntersection(intersections);
    	console.log("Exercice B - Question 1 : closest intersection:", closestIntersection);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		getCarb,
    		convertStringToArrayOfNumbers,
    		getSumFromArray,
    		getTotalCarbPerModule,
    		convertPosition,
    		checkPositions,
    		getClosestIntersection,
    		modulesString,
    		fil1,
    		fil2,
    		modulesNumberArray,
    		totalCarb,
    		realTotalCarb,
    		positionArray1,
    		positionArray2,
    		intersections,
    		closestIntersection
    	});

    	return [totalCarb, realTotalCarb, closestIntersection];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
