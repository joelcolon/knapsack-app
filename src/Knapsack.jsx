import React from "react";
import { useState } from "react";
import "./App.css";
const items = [
  { id: 1, name: "Laptop", value: 60, weight: 10 },
  { id: 2, name: "Cámara", value: 100, weight: 20 },
  { id: 3, name: "Teléfono", value: 120, weight: 30 },
  { id: 4, name: "Reloj", value: 50, weight: 5 },
  { id: 5, name: "Tablet", value: 80, weight: 15 },
];

const MAX_WEIGHT = 50;
export default function Knapsack() {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const knapsackDP = () => {
    const n = selectedItems.length;
    const W = MAX_WEIGHT;
    const dp = Array(n + 1)
      .fill(null)
      .map(() => Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= W; w++) {
        if (selectedItems[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            selectedItems[i - 1].value +
              dp[i - 1][w - selectedItems[i - 1].weight]
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
    return dp[n][W];
  };

  const totalWeight = selectedItems.reduce((sum, item) => sum + item.weight, 0);
  const optimalValue = knapsackDP();

  return (
    <div className="container">
      <h2>Problema de la Mochila</h2>
      <p>Selecciona los objetos a llevar (máx {MAX_WEIGHT}kg)</p>

      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => toggleItem(item)}
          className={selectedItems.includes(item) ? "selected" : ""}
        >
          {item.name} (Valor: {item.value}, Peso: {item.weight}kg)
        </button>
      ))}

      <div className="info">
        <p className="text">
          <strong>Peso actual:</strong> {totalWeight}kg / {MAX_WEIGHT}kg
        </p>
        <p className="text">
          <strong>Valor máximo posible:</strong> {optimalValue}
        </p>
      </div>
    </div>
  );
}
