import React from "react";

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
