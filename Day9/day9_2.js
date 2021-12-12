const fs = require("fs");

let visited = [];
let visitedRec = [];

function doStep(m, i, j, rec) {
    if(i<0 || j<0) {
        return [m,0];
    }
    let sum = 0;
    let allAdjs = [[i-1,j],
        [i-1,j-1],
        [i-1, j+1],
        [i,j+1],
        [i,j-1],
        [i+1,j],
        [i+1,j-1],
        [i+1,j+1]];

    let prev = (a) => visited.some(pa => pa[0] === a[0] && pa[1] === a[1]);
    let adjs = allAdjs.filter(a => !isNaN(a[0]) && (
        visited?
            !prev(a):true));

    if(!visitedRec.some(pa => pa[0] === i && pa[1] === j))
        m[i][j]++;
    if(m[i][j] > 9) {
        visited = [...visited, [i,j]]
        m[i][j]=0;
        console.log('at', i,j, adjs)
        sum++;
        if(i==4 && j==9){
            let test2 = i;
        }
        for(let adj of adjs) {
            if (m?.[adj[0]]?.[adj[1]] === undefined) {
                continue;
            }

            m[adj[0]][adj[1]]++;
        }

        for(let adj of adjs) {
            if (m?.[adj[0]]?.[adj[1]] === undefined) {
                continue;
            }

            let adj0= adj[0];
            let adj1= adj[1];
            let advV = m[adj0][adj1];
            if(m[adj[0]][adj[1]] > 9){
                if(adj0 === 4 && adj1 === 8){
                    let test = adj1;
                }
                // m[adj[0]][adj[1]] = 0;
                //sum++;
                visited = [...visited, [adj0, adj1]];
                visitedRec = [...visitedRec, [adj0, adj1]];
                let stepS = doStep(m,adj[0],adj[1],true);
                m = stepS[0];
                sum += stepS[1];
            }
        }
    }

    return [m,sum];
}

async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day11/input.txt');
    const lines = fileContent.toString().split('\n');
    let matrix = [];
    for(let i=0;i<lines.length;i++){
        let line = lines[i];
        for(let j=0;j<line.length;j++){
            if(!matrix[i]){
                matrix[i] = [];
            }

            matrix[i][j] = parseInt(line[j]);
        }
    }

    let res = 0;
    for(let step =0;step<100; step++) {
        visited = [];
        visitedRec = [];
        for (let i = 0; i < matrix.length; i++) {
            let line = matrix[i];
            for (let j = 0; j < line.length; j++) {
                let stepRes = doStep(matrix, i, j, false);
                res += stepRes[1];
                matrix = stepRes[0];
            }
        }

        let allFlashed = matrix.every(l => l.every(e => e===0));
        if(allFlashed){
            console.log(step);
            break;
        }
    }

    console.log(matrix);
    console.log(res);
}

exports.run = run;