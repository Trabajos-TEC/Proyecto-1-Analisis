import { useState, useEffect } from "react";
import Tablero from "./components/Tablero";
import Contadores from "./components/Contadores";
import { generarMatriz, knightTourPasoAPaso } from "./utils";
import "./App.css";

export default function App() {
  const [n, setN] = useState(5);
  const [tablero, setTablero] = useState(generarMatriz(5));
  const [mostrar, setMostrar] = useState(true);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [contador, setContador] = useState({ count: 0, backtracks: 0 });
  const [ejecutando, setEjecutando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [inicio, setInicio] = useState(Date.now());
  const [posActual, setPosActual] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ejecutando) {
      setPosActual({ x: posX, y: posY });
    }
  }, [posX, posY, ejecutando]);

  const ejecutar = async () => {
    setEjecutando(true);
    setInicio(Date.now());
    setMensaje("");

    const t = generarMatriz(n);
    setTablero(t);
    setContador({ count: 0, backtracks: 0 });

    setPosActual({ x: posX, y: posY });

    const exito = await knightTourPasoAPaso(
      posX,
      posY,
      0,
      t,
      mostrar,
      setTablero,
      setContador,
      inicio,
      setPosActual
    );

    setEjecutando(false);
    setMensaje(
      exito ? "¡Se encontró una solución!" : "No se encontró solución."
    );
  };

  return (
    <div className="app">
      <h1>Knight's Tour Visualizer</h1>

      <div className="inputs">
        <label>
          Tamaño del tablero (n):
          <input
            type="number"
            value={n}
            disabled={ejecutando}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setN(val);
              setTablero(generarMatriz(val));
              setPosActual({ x: 0, y: 0 });
            }}
          />
        </label>

        <label>
          Mostrar pasos:
          <input
            type="checkbox"
            checked={mostrar}
            disabled={ejecutando}
            onChange={(e) => setMostrar(e.target.checked)}
          />
        </label>

        <label>
          Fila inicial:
          <input
            type="number"
            value={posX}
            disabled={ejecutando}
            min={0}
            max={n - 1}
            onChange={(e) => {
              const x = parseInt(e.target.value);
              setPosX(x);
              if (!ejecutando) setPosActual({ x, y: posY });
            }}
          />
        </label>

        <label>
          Columna inicial:
          <input
            type="number"
            value={posY}
            disabled={ejecutando}
            min={0}
            max={n - 1}
            onChange={(e) => {
              const y = parseInt(e.target.value);
              setPosY(y);
              if (!ejecutando) setPosActual({ x: posX, y });
            }}
          />
        </label>

        <button onClick={ejecutar} disabled={ejecutando}>
          {ejecutando ? "Ejecutando..." : "Iniciar Knight's Tour"}
        </button>
      </div>

      <Tablero tablero={tablero} posActual={posActual} />
      <Contadores
        contador={contador}
        mensaje={mensaje}
        ejecutando={ejecutando}
        inicio={inicio}
      />
    </div>
  );
}
