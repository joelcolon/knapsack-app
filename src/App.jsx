import { useState } from "react";
import "./App.css";
import Knapsack from "./Knapsack";

// Lista de objetos con valor y peso
const items = [
  { id: 1, name: "Laptop", value: 60, weight: 10 },
  { id: 2, name: "Cámara", value: 100, weight: 20 },
  { id: 3, name: "Teléfono", value: 120, weight: 30 },
  { id: 4, name: "Reloj", value: 50, weight: 5 },
  { id: 5, name: "Tablet", value: 80, weight: 15 },
];

const MAX_WEIGHT = 50;

// Función para generar una solución aleatoria
const generateRandomSolution = () => {
  return items.map(() => (Math.random() > 0.5 ? 1 : 0));
};

// Función para calcular el valor y peso de una solución
const evaluateSolution = (solution) => {
  let totalValue = 0;
  let totalWeight = 0;

  solution.forEach((selected, index) => {
    if (selected) {
      totalValue += items[index].value;
      totalWeight += items[index].weight;
    }
  });

  // Penalizar soluciones que excedan el peso máximo
  return totalWeight > MAX_WEIGHT ? 0 : totalValue;
};

// Función de cruce (crossover) entre dos soluciones
const crossover = (parent1, parent2) => {
  const point = Math.floor(Math.random() * items.length);
  return [
    [...parent1.slice(0, point), ...parent2.slice(point)],
    [...parent2.slice(0, point), ...parent1.slice(point)],
  ];
};

// Función de mutación
const mutate = (solution) => {
  const index = Math.floor(Math.random() * solution.length);
  solution[index] = solution[index] === 1 ? 0 : 1;
  return solution;
};

// Algoritmo genético principal
const geneticAlgorithm = (generations = 100, populationSize = 10) => {
  let population = Array.from(
    { length: populationSize },
    generateRandomSolution
  );

  for (let gen = 0; gen < generations; gen++) {
    // Evaluar cada solución y ordenarlas por fitness
    population.sort((a, b) => evaluateSolution(b) - evaluateSolution(a));

    // Tomamos las mejores soluciones para la siguiente generación
    const newPopulation = population.slice(0, populationSize / 2);

    // Aplicamos crossover y mutación para crear nuevas soluciones
    while (newPopulation.length < populationSize) {
      const [child1, child2] = crossover(
        newPopulation[Math.floor(Math.random() * newPopulation.length)],
        newPopulation[Math.floor(Math.random() * newPopulation.length)]
      );

      newPopulation.push(mutate(child1), mutate(child2));
    }

    population = newPopulation;
  }

  // Devolvemos la mejor solución encontrada
  return population[0];
};

function App() {
  const [bestSolution, setBestSolution] = useState(null);

  const findBestSolution = () => {
    const solution = geneticAlgorithm();
    setBestSolution(solution);
  };

  return (
    <div className="container1">
      <div className="container">
        <h1>Problema de la Knapsack</h1>
        <p>Usando un Algoritmo Genético para encontrar la mejor combinación</p>
        <button onClick={findBestSolution}> Encontrar Mejor Solución</button>

        {bestSolution && (
          <div className="info">
            <h2>Mejor Combinación:</h2>
            <div className="info1">
              {bestSolution.map((selected, index) =>
                selected ? <h3 key={index}>{items[index].name}</h3> : null
              )}
            </div>
            <p className="text">
              Valor Total: {evaluateSolution(bestSolution)}
            </p>
          </div>
        )}
      </div>
      <div className="name">
      <h1 className="name1">Joel Isaac Colón Solano<hr/></h1>
      <h1 className="name2">Juan Enmanuel López Aramboles<hr/></h1>
      </div>

      <Knapsack />
    </div>
  );
}

export default App;
