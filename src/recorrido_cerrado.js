

const movimientosPosibles = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];

/*
 * Función: esValido
 * Entradas:
 *   - x: posición fila actual.
 *   - y: posición columna actual.
 *   - tablero: matriz que representa el tablero del recorrido.
 * Salida:
 *   - true si la posición es válida, false si no lo es.
 * Descripción:
 *   Verifica que la posición (x, y) esté dentro de los límites del tablero
 *   y que la casilla esté libre (-1) o marcada como retroceso (-2).
 */

function esValido(x, y, tablero) {
  const n = tablero.length;

  //Verifica que (x, y) esté dentro de los limites del tablero
  if (x < 0 || x >= n || y < 0 || y >= n) {
    return false;
  }

  //Verifica que la casilla este libre (sin visitar)
  // Permitimos -1 (nunca visitada) y -2 (marcada por backtrack)
  if (tablero[x][y] !== -1 && tablero[x][y] !== -2) {
    return false;
  }

  //Si paso las dos pruebas, es valida
  return true;
}

export async function recorrido_cerrado(x, y, paso, tablero, mostrar, setTablero, setContador, inicio, setPosActual, xInicio = x, yInicio = y,primerPasoIntentos = 0) {
  if (tablero.length === 4 || tablero.length % 2 === 1){
    return false
  }
  
  const t = [];
  for (let i = 0; i < tablero.length; i++) {
    const fila = [];
    for (let j = 0; j < tablero[i].length; j++) {
      fila.push(tablero[i][j]);
    }
    t.push(fila);
  }

  t[x][y] = paso;

  if (setPosActual) setPosActual({ x, y });

  // Actualizamos el contador de intentos
  setContador((anterior) => ({
    count: anterior.count + 1,
    backtracks: anterior.backtracks,
  }));

  setTablero(t);

  // Animación y control de tiempo
  let tiempoTranscurrido = (Date.now() - inicio) / 1000;
  let delay = 1000;

  if (tiempoTranscurrido >= 120) {
    delay = 0;
  }

  // Promesa para "ejecutar" el delay
  if (mostrar) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  const size = t.length;

  // Condición de éxito (recorrido cerrado)
  if (paso === size * size - 1) {
    for (const move of movimientosPosibles) {
      const xCierre = x + move[0];
      const yCierre = y + move[1];
      if (xCierre === xInicio && yCierre === yInicio) {
        return true; // cerrado válido
      }
    }
    return false; // tablero completo, pero no cerrado
  }

  // Exploramos movimientos
  for (let i = 0; i < movimientosPosibles.length; i++) {
    let moves = movimientosPosibles[i];

    const xNuevo = x + moves[0];
    const yNuevo = y + moves[1];

    if (esValido(xNuevo, yNuevo, t)) {
      let nuevosIntentosPrimerPaso = primerPasoIntentos;
      if (paso === 0) nuevosIntentosPrimerPaso++;

      if (paso === 0 && nuevosIntentosPrimerPaso >= 8) {
        return "NO_SOLUCION";
      }

      if (
        await recorrido_cerrado(
          xNuevo,
          yNuevo,
          paso + 1,
          t,
          mostrar,
          setTablero,
          setContador,
          inicio,
          setPosActual,
          xInicio,
          yInicio
        )
      ) {
        return true;
      }
    }
  }


  // Si llegamos aquí, es que no hubo exito, retrocedemos
  t[x][y] = -2;

  if (setPosActual) {
    setPosActual({ x, y }); // actualiza la posición al retroceder
  }

  setContador((anterior) => ({
    count: anterior.count,
    backtracks: anterior.backtracks + 1,
  }));

  // Actualizamos el tablero para mostrar la casilla roja
  const tableroBack = [];
  for (let i = 0; i < t.length; i++) {
    const fila = [];
    for (let j = 0; j < t[i].length; j++) {
      fila.push(t[i][j]);
    }
    tableroBack.push(fila);
  }
  setTablero(tableroBack);

  if (mostrar) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

    return false;
}