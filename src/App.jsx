/*
 * Archivo: App.jsx
 * Descripción: Componente principal de la aplicación "Knight's Tour Visualizer".
 *              Gestiona el estado global, los parámetros del tablero, el tipo de recorrido,
 *              y controla la ejecución del algoritmo de recorrido abierto o cerrado.
 *              Además, coordina los componentes hijos: Tablero y Contadores.
 */

// Importaciones de React y componentes auxiliares
import { useState, useEffect } from "react";
import Tablero from "./components/Tablero";
import Contadores from "./components/Contadores";
import { recorrido_abierto } from "./recorrido_abierto";
import { recorrido_cerrado } from "./recorrido_cerrado";
import { generarMatriz } from "./generar_matriz";
import "./App.css";


/*
 * Componente principal: App
 * Descripción: Controla la lógica y visualización del recorrido del caballo (Knight’s Tour).
 * Gestiona los estados, la ejecución del algoritmo (abierto o cerrado),
 * y la interacción del usuario mediante la interfaz.
 */
export default function App() {
  const [n, setN] = useState(5);
  const [tablero, setTablero] = useState(generarMatriz(5));
  const [mostrar, setMostrar] = useState(true);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [contador, setContador] = useState({ count: 0, backtracks: 0 });
  const [ejecutando, setEjecutando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mensaje2, setMensaje2] = useState("");
  const [inicio, setInicio] = useState(Date.now());
  const [posActual, setPosActual] = useState({ x: 0, y: 0 });
  const [tipoRecorrido, setTipoRecorrido] = useState("abierto"); //nuevo estado


  /*
   * useEffect
   * Entradas: [posX, posY, ejecutando]
   * Salida: Actualización del estado posActual.
   * Descripción: Actualiza la posición del caballo cuando no se está ejecutando el algoritmo.
   */
  useEffect(() => {
    if (!ejecutando) {
      setPosActual({ x: posX, y: posY });
    }
  }, [posX, posY, ejecutando]);
  /*
   * useEffect
   * Entradas: [posX, posY, ejecutando]
   * Salida: Actualización del estado posActual.
   * Descripción: Actualiza la interfaz cada que se tiene interaccion con alguna funcion.
   */
  useEffect(() => 
    {
    if (!ejecutando) {
      setTablero(generarMatriz(n));
      setPosActual({ x: posX, y: posY });
      setMensaje("");
      setMensaje2("");
      setContador({ count: 0, backtracks: 0 });
    }
  }, [n, tipoRecorrido, posX, posY,mostrar]);

  /*
   * ejecutar
   * Entradas: Ninguna (usa estados globales del componente)
   * Salida: Actualiza el tablero con el recorrido del caballo y muestra el resultado.
   * Descripción: Ejecuta el recorrido (abierto o cerrado) desde la posición inicial.
   *              Controla los mensajes, tiempos y actualiza los contadores.
   */
  const ejecutar = async () => {
    setEjecutando(true);
    const tiempoInicio = Date.now();
    setInicio(tiempoInicio);
    setMensaje("");
    setMensaje2("");

    const t = generarMatriz(n);
    setTablero(t);
    setContador({ count: 0, backtracks: 0 });
    setPosActual({ x: posX, y: posY });

    let exito = false;

    // Seleccionamos cuál recorrido ejecutar
    if (tipoRecorrido === "abierto") {
      exito = await recorrido_abierto(posX, posY, 0, t, mostrar, setTablero, setContador, tiempoInicio, setPosActual);
    } else {
      exito = await recorrido_cerrado(posX, posY, 0, t, mostrar, setTablero, setContador, tiempoInicio,setPosActual);
    }

    // Cálculo del tiempo total de ejecución
    const tiempoFinal = Date.now();
    const duracionSegundos = ((tiempoFinal - tiempoInicio) / 1000).toFixed(2);

    // Mensajes de resultad
    setEjecutando(false);
    if (exito === "NO_SOLUCION") {
      setMensaje(`No hay solución posible desde la posición inicial (${posX}, ${posY})`);
    } else {
      setMensaje(
        exito ? `¡Se encontró una solución (${tipoRecorrido})!` : `No se encontró solución (${tipoRecorrido}).`
      );
    }
    setMensaje2(`Tiempo de ejecución: ${duracionSegundos} segundos`);
  };

 /* ||||||||||||||||||||||||||||| - INTERFAZ DE USUARIO - ||||||||||||||||||||||||||||| */

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
            min={3}
            max={8}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (isNaN(val) || val < 4 || val >= 8) {
                alert(`La dimensión del debe estar entre 4 y 7.`);
                return;
               }
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
            min={-1}
            max={n}
            onChange={(e) => {
              const x = parseInt(e.target.value);
              if (isNaN(x) || x < 0 || x >= n) {
                alert(`La fila inicial debe estar entre 0 y ${n - 1}.`);
                return;
              }
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
            min={-1}
            max={n}
            onChange={(e) => {
              const y = parseInt(e.target.value);
              if (isNaN(y) || y < 0 || y >= n) {
                alert(`La columna inicial debe estar entre 0 y ${n - 1}.`);
                return;
              }
              setPosY(y);
              if (!ejecutando) setPosActual({ x: posX, y });
            }}
          />
        </label>


        {/* Selector de tipo de recorrido */}
        <label id="label-tipo-recorrido" className="input-tipo-recorrido">
          Tipo de recorrido:
          <select
            id="select-tipo-recorrido"
            className="select-tipo-recorrido"
            value={tipoRecorrido}
            disabled={ejecutando}
            onChange={(e) => setTipoRecorrido(e.target.value)}
          >
            <option value="abierto">Recorrido Abierto</option>
            <option value="cerrado">Recorrido Cerrado</option>
          </select>
        </label>


        <button onClick={ejecutar} disabled={ejecutando}>
          {ejecutando ? "Ejecutando..." : "Iniciar Knight's Tour"}
        </button>
      </div>

      <Tablero tablero={tablero} posActual={posActual} />
      <Contadores
        contador={contador}
        mensaje={`${mensaje} ${mensaje2}`}
        ejecutando={ejecutando}
        inicio={inicio}
      />
    </div>
  );
}
