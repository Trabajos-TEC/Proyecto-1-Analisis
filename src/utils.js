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

  //Verifica que (x, y) esté dentro de los limites del tablero
  if (x < 0 || x >= n || y < 0 || y >= n) {
    return false;
  }

  //Verifica que la casilla este libre (sin visitar)
  if (tablero[x][y] !== -1) {
    return false;
  }

  //Si paso las dos pruebas, es valida
  return true;
}

export async function knightTourPasoAPaso(x,y,paso,tablero,mostrar,setTablero,setContador,inicio,setPosActual){ // actualiza la posición del caballo) 
  
  const t = [];
  for (let i = 0; i < tablero.length; i++) {
    const fila = [];
    for (let j = 0; j < tablero[i].length; j++) {
      fila.push(tablero[i][j]); // copiamos cada valor
    }
    t.push(fila); // agregamos la fila copiada al nuevo tablero
  }

  t[x][y] = paso;

  if (setPosActual) setPosActual({ x, y }); // se actualiza al avanzar

  // Actualizamos el contador de intentos
  setContador(anterior => ({ count: anterior.count + 1, backtracks: anterior.backtracks }));

  // Actualizamos el tablero
  setTablero(t);

  let tiempoTranscurrido = (Date.now() - inicio) / 1000;
  let delay = 300;

  if (tiempoTranscurrido > 10 && tiempoTranscurrido <= 20) {
    delay = 100;
  }

  if (tiempoTranscurrido > 20) {
    delay = 50;
  }

  if (mostrar) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  const size = t.length;
  if (paso === size * size - 1){
    return true
  }
  for (let i = 0; i < movimientosPosibles.length; i++) {
    let moves = movimientosPosibles[i]
  
    if (paso === 0){
      moves = movimientosPosibles[random(0,7)]
    }

    const xNuevo = x + moves[0];
    const yNuevo = y + moves[1];
    
    if (esValido(xNuevo, yNuevo, t)) {
      if ((await knightTourPasoAPaso(xNuevo, yNuevo, paso + 1, t, mostrar, setTablero, setContador, inicio, setPosActual))){
        return true;
      }
    }
  }
  // Backtracking: desmarcamos la casilla y actualizamos la UI
  t[x][y] = -1;

  if (setPosActual) {
    setPosActual({ x, y }); // actualizamos la posición al retroceder
  }

  // Contador de retrocesos
  setContador(anterior => ({ count: anterior.count, backtracks: anterior.backtracks + 1 }));

  // Actualizamos el tablero con la nueva matriz (copia manual)
  const nuevoTablero = [];
  for (let i = 0; i < t.length; i++) {
    const fila = [];
    for (let j = 0; j < t[i].length; j++) {
      fila.push(t[i][j]);
    }
    nuevoTablero.push(fila);
  }
  setTablero(nuevoTablero);

  // Espera para animación si se está mostrando
  if (mostrar) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return false;
}
