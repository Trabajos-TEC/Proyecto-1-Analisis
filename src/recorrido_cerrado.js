
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

export function generarMatriz(n) {
    let res = [];
    for (let i = 0; i < n; i++) {
        let temp = [];
        for (let j = 0; j < n; j++) {
            temp.push(-1);
        }
        res.push(temp);
    }
    return res;
}

function esValido(x, y, tablero) {
  const n = tablero.length;

  // Verifica que (x, y) esté dentro de los limites del tablero
  if (x < 0 || x >= n || y < 0 || y >= n) {
    return false;
  }

  // Verifica que la casilla este libre (sin visitar)
  if (tablero[x][y] !== -1) {
    return false;
  }

  // Si paso las dos pruebas, es valida
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
  let delay = 0;

  if (tiempoTranscurrido > 10 && tiempoTranscurrido <= 20) {
    delay = 0;
  }

  if (tiempoTranscurrido > 20) {
    delay = 0;
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

    if (paso === 0) {
      moves = movimientosPosibles[random(0, 7)];
    }

    const xNuevo = x + moves[0];
    const yNuevo = y + moves[1];

    if (esValido(xNuevo, yNuevo, t)) {
      let nuevosIntentosPrimerPaso = primerPasoIntentos;
      if (paso === 0) nuevosIntentosPrimerPaso++;


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

  // Backtracking
  t[x][y] = -1;

  if (setPosActual) setPosActual({ x, y });

  setContador((anterior) => ({
    count: anterior.count,
    backtracks: anterior.backtracks + 1,
  }));

  // Copia del tablero para actualizar visualmente
  const nuevoTablero = [];
  for (let i = 0; i < t.length; i++) {
    const fila = [];
    for (let j = 0; j < t[i].length; j++) {
      fila.push(t[i][j]);
    }
    nuevoTablero.push(fila);
  }

  setTablero(nuevoTablero);

  if (mostrar) await new Promise((resolve) => setTimeout(resolve, delay));

  return false;
}
