/*
 * Archivo: generar_matriz.js
 * Descripción: Proporciona una función para generar una matriz cuadrada de tamaño n x n
 *              inicializada con -1 en todas sus casillas. Esta matriz representa
 *              el tablero vacío para el recorrido del caballo (Knight’s Tour).
 */

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