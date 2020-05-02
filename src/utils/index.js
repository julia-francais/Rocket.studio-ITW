//Exercice 1

// We write the function to get the carb quantity per module
export const getCarb = (n) => Math.floor(n / 3) - 2;

// We create a function that transforms our initial string into an array of numbers
export const convertStringToArrayOfNumbers = (string) => {
  let numberArray = [];
  const stringArray = string.split(" ");
  //we map through the first string array to convert each value into number and add it to the second array
  stringArray.map((module) => {
    numberArray.push(Number(module));
  });
  return numberArray;
};

export const getSumFromArray = (modules, calculateCarb) => {
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
export const getTotalCarbPerModule = (mass) => {
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
export const convertPosition = (string) => {
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
      default:
    }
  });
  return positionArray;
};

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
export const checkIntersections = (p1, p2, p3, p4) => {
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
export const checkPositions = (arr1, arr2) => {
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
export const manhattanDistance = (p1, p2) => {
  const result = Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
  return result;
};

//We convert calculate the manhattan distance of each intersection found previously, store it in an array and return the minimum value.
export const getClosestIntersection = (positionArr) => {
  let distanceArr = [];
  positionArr.map((pos) => {
    const originPos = { x: 0, y: 0 };
    distanceArr.push(manhattanDistance(originPos, pos));
  });
  return Math.min(...distanceArr);
};
