import React, { useState } from "react";
import Tablero from "./components/Tablero";
import Contadores from "./components/Contadores";

export default function App() {
  const [n, setN] = useState(5);
  const [tablero, setTablero] = useState([]);

  return (
    <div className="app">
      <h1>Knight's Tour Visualizer</h1>

      <div className="inputs">
        <label>
          Tamaño del tablero (n):
          <input
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
          />
        </label>

        <label>
          Mostrar pasos:
          <input type="checkbox" />
        </label>

        <label>
          Fila inicial:
          <input type="number" min={0} max={n - 1} />
        </label>

        <label>
          Columna inicial:
          <input type="number" min={0} max={n - 1} />
        </label>

        <button>Iniciar Knight's Tour</button>
      </div>

      <Tablero tablero={tablero} />
      <Contadores contador={{ count: 0, backtracks: 0 }} />
    </div>
  );
}
