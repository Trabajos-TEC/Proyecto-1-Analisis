// Movimientos del caballo
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
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

// 🔹 MODIFICADO: esValido acepta -2 como libre
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

export async function recorrido_abierto(
  x, y, paso, tablero, mostrar, setTablero, setContador, inicio, setPosActual, primerPasoIntentos = 0) {
  const t = [];
  for (let i = 0; i < tablero.length; i++) {
    const fila = [];
    for (let j = 0; j < tablero[i].length; j++) {
      fila.push(tablero[i][j]); // copiamos cada valor
    }
    t.push(fila); // agregamos la fila copiada al nuevo tablero
  }

  // Finalmente marcar la casilla actual
  t[x][y] = paso;

  if (setPosActual) setPosActual({ x, y }); // se actualiza al avanzar

  // Actualizamos el contador de intentos
  setContador((anterior) => ({ count: anterior.count + 1, backtracks: anterior.backtracks }));

  // Actualizamos el tablero
  setTablero(t);


  let tiempoTranscurrido = (Date.now() - inicio) / 1000;
  let delay = 1000;

  if (tiempoTranscurrido >= 120) {
    delay = 0;
  }

  if (mostrar) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Condicion de exito
  const size = t.length;
  if (paso === size * size - 1) {
    return true;
  }

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
        await recorrido_abierto( xNuevo, yNuevo, paso + 1, t, mostrar, setTablero, setContador, inicio, setPosActual, nuevosIntentosPrimerPaso )
      ) {
        return true;
      }
    }
  }

  // Si llegamos aquí, es que no hubo exito, retrocedemos
t[x][y] = -2;

if (setPosActual) {
  setPosActual({ x, y }); // actualizamos la posición al retroceder
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
