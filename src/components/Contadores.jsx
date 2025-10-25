/*
 * Archivo: Contadores.jsx
 * Descripción: Componente encargado de mostrar los contadores e información de estado del algoritmo.
 *              Presenta el número de intentos, retrocesos, tiempo transcurrido y mensajes
 *              informativos del recorrido del caballo.
 */

import React from "react";
/*
 * Componente: Contadores
 * Entradas:
 *   - contador: Objeto con los valores de { count, backtracks }.
 *   - mensaje: Texto informativo o de resultado del recorrido.
 *   - ejecutando: Booleano que indica si el algoritmo está en ejecución.
 *   - inicio: Marca de tiempo (Date.now()) del inicio de la ejecución.
 * Salida: Renderiza los contadores, mensajes y el tiempo transcurrido.
 * Descripción: Muestra los datos estadísticos del recorrido del caballo,
 *              incluyendo número de intentos, retrocesos, tiempo de ejecución
 *              y mensajes informativos sobre el resultado.
 */
export default function Contadores({ contador, mensaje, ejecutando, inicio }) {
  return (
    <div className="contadores">
      <h3>Contadores</h3>
      <p>Intentos: {contador.count}</p>
      <p>Retrocesos: {contador.backtracks}</p>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      {ejecutando && (
        <p>Tiempo transcurrido: {((Date.now() - inicio) / 1000).toFixed(2)}s</p>
      )}
    </div>
  );
} 
