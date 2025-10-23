import { useState, useEffect } from "react";
import Tablero from "./components/Tablero";
import Contadores from "./components/Contadores";
import {recorrido_abierto } from "./recorrido_abierto";
import {recorrido_cerrado } from "./recorrido_cerrado";
import { generarMatriz} from "./generar_matriz";
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
  const [mensaje2, setMensaje2] = useState(""); // ✅ corregido nombre duplicado
  const [inicio, setInicio] = useState(Date.now());
  const [posActual, setPosActual] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ejecutando) {
      setPosActual({ x: posX, y: posY });
    }
  }, [posX, posY, ejecutando]);

  const ejecutar = async () => {
    setEjecutando(true);
    const tiempoInicio = Date.now(); // ⏱️ Tomamos el inicio real aquí
    setInicio(tiempoInicio);
    setMensaje("");
    setMensaje2("");

    const t = generarMatriz(n);
    setTablero(t);
    setContador({ count: 0, backtracks: 0 });
    setPosActual({ x: posX, y: posY });

    const exito = await recorrido_abierto(
      posX,
      posY,
      0,
      t,
      mostrar,
      setTablero,
      setContador,
      tiempoInicio,
      setPosActual
    );

    const tiempoFinal = Date.now();
    const duracionSegundos = ((tiempoFinal - tiempoInicio) / 1000).toFixed(2);

    setEjecutando(false);
    setMensaje(
      exito ? "¡Se encontró una solución!" : "No se encontró solución."
    );
    setMensaje2(`Tiempo de ejecución: ${duracionSegundos} segundos`);
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
        mensaje={`${mensaje} ${mensaje2}`} // ✅ Muestra ambos mensajes juntos
        ejecutando={ejecutando}
        inicio={inicio}
      />
    </div>
  );
}
