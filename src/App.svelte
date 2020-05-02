<script>
  import {
    getCarb,
    convertStringToArrayOfNumbers,
    getSumFromArray,
    getTotalCarbPerModule,
    convertPosition,
    checkPositions,
    getClosestIntersection
  } from "./utils";
  import { modulesString, fil1, fil2 } from "./data";

  //Question 1 : Masse module

  const modulesNumberArray = convertStringToArrayOfNumbers(modulesString);

  const totalCarb = getSumFromArray(modulesNumberArray, getCarb);

  console.log("Exercice A - Question 1 : totalCarb", totalCarb);

  //========================================================***************===========================================================
  //Question 2

  //We call the previous function with our modules array and the new function that calculates the total carb needed
  const realTotalCarb = getSumFromArray(
    modulesNumberArray,
    getTotalCarbPerModule
  );
  console.log("Exercice A - Question 2 : realTotalCarb", realTotalCarb);

  //========================================================***************===========================================================
  //Exercice 2

  const positionArray1 = convertPosition(fil1);
  const positionArray2 = convertPosition(fil2);

  const intersections = checkPositions(positionArray1, positionArray2);

  //We remove the first element of the intersection which consists in the origin position.
  intersections.shift();

  const closestIntersection = getClosestIntersection(intersections);
  console.log(
    "Exercice B - Question 1 : closest intersection:",
    closestIntersection
  );
</script>

<style>
  main {
    padding: 0.5em;
    max-width: 90%;
    margin: 0 auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 2.4em;
    font-weight: 100;
  }

  .exercise {
    margin-bottom: 3em;
  }
  .response {
    font-weight: bold;
    font-size: 1.2em;
  }

  @media (min-width: 1000px) {
    main {
      max-width: 900px;
    }
  }
</style>

<main>
  <h1>Rocket Studio - JS interview / Julia Francais</h1>
  <div class="exercise">
    <h3>Exercice A</h3>
    <hr />
    <ul class="question">
      <li>
        <h4>
          Quelle est la somme des besoins en carburant pour tous les modules de
          notre fusée ?
        </h4>
        <p>
          La somme des besoins en carburant pour tous les modules de notre fusée
          est de
          <span class="response">{totalCarb.toLocaleString()}</span>
          .
        </p>
      </li>
      <li>
        <h4>
          Quelle est la somme des besoins en carburant de tous les modules de
          notre fusée en tenant compte également de la masse du carburant ajouté
          ?
        </h4>
        <p>
          La somme des besoins en carburant de tous les modules de notre fusée,
          en tenant compte de la masse du carburant ajouté est de
          <span class="response">{realTotalCarb.toLocaleString()}</span>
          .
        </p>
      </li>
    </ul>
  </div>
  <div class="exercise">
    <h3>Exercice B</h3>
    <hr />

    <ul class="question">
      <li>
        <h4>
          Quelle est la distance de Manhattan entre le port central et
          l'intersection la plus proche ?
        </h4>
        <p>
          La distance de Manhattan entre le port central et l'intersection la
          plus proche est de
          <span class="response">{closestIntersection}</span>
          .
        </p>
      </li>
    </ul>
  </div>

</main>
