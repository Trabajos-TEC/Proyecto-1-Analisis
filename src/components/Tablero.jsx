/*
 * Archivo: Tablero.jsx
 * Descripción: Componente encargado de renderizar el tablero del Knight's Tour.
 *              Muestra las casillas, los números de los pasos realizados,
 *              retrocesos y la posición actual del caballo con imagen.
 */

import React from "react";
import caballoBlanco from "../assets/caballo_blanco.png";
import caballoNegro from "../assets/caballo_negro.png";
import "../App.css";

/*
 * Componente: Tablero
 * Entradas:
 *   - tablero: matriz que representa el estado actual del tablero.
 *   - posActual: objeto {x, y} que indica la posición actual del caballo.
 * Salida: Renderiza visualmente el tablero con colores, retrocesos y el caballo.
 * Descripción: Cada casilla se colorea alternadamente como blanca o negra.
 *              Se marca con diferentes clases si ha sido recorrida, si es un backtrack,
 *              o si actualmente contiene el caballo.
 */

export default function Tablero({ tablero, posActual }) {
  const n = tablero.length;

  return (
    <div
      id="tablero"
      style={{
        gridTemplateColumns: `repeat(${n}, 50px)`,
      }}
    >
      {tablero.map((fila, i) =>
        fila.map((val, j) => {
          const esCaballo = posActual?.x === i && posActual?.y === j;
          const esRetroceso = val === -2;
          const isRecorrida = val !== -1 && val !== -2;

          const celdaColor = (i + j) % 2 === 0 ? "blanca" : "negra";

          let caballoImg = null;
          if (esCaballo) {
            caballoImg = celdaColor === "blanca" ? caballoNegro : caballoBlanco;
          }

          return (
            <div
              key={`${i}-${j}`}
              className={`celda ${
                celdaColor === "blanca" ? "celda-blanca" : "celda-negra"
              } ${isRecorrida ? "celda-recorrida" : ""} ${
                esRetroceso ? "celda-backtrack" : ""
              } ${esCaballo ? "celda-caballo" : ""}`}
            >
              {esCaballo ? (
                <img src={caballoImg} alt="Caballo" />
              ) : isRecorrida ? (
                val.toString().padStart(2, "0")
              ) : (
                ""
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
