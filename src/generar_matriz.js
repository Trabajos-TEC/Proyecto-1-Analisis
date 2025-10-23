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