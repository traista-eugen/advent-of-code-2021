const fs = require("fs");

function minOf(numbers) {
    return Math.min(...numbers);
}

let visited = [];

function getBasin(m, i, j) {
    let sum = 0;
    let allAdjs = [[m?.[i-1]?.[j],i-1,j],
        [m?.[i]?.[j+1],i,j+1],
        [m?.[i]?.[j-1],i,j-1],
        [m?.[i+1]?.[j],i+1,j]];

    let current = m[i][j];
    let prev = (a) => visited.some(pa => pa[1] === a[1] && pa[2] === a[2]);
    let adjs = allAdjs.filter(a => !isNaN(a[0]) && a[0]<9 && (
            visited?
            !prev(a):true));
    
    for(let adj of adjs){
        let allAdjs = [...adjs, [current, i, j]];
        visited = [...visited, ...allAdjs];
        sum += getBasin(m, adj[1], adj[2])
    }

    sum += adjs.length;
    return sum;
}

async function run() {
    const fileContent = await fs.promises.readFile('./Day9/input.txt');
    const lines = fileContent.toString().split('\n');
    let m = [];
    for(let i=0;i<lines.length;i++){
        let line = lines[i];
        for(let j=0;j<line.length;j++){
            if(!m[i]){
                m[i] = [];
            }

            m[i][j] = parseInt(line[j]);
        }
    }

    let basins = [];
    for(let i=0;i<m.length;i++){
        let line = m[i];
        for(let j=0; j < line.length; j++){
            let nums = [m[i]?.[j],,
            m?.[i-1]?.[j],,
            m?.[i]?.[j+1],
            m?.[i]?.[j-1],
            m?.[i+1]?.[j],];
            let current = m[i][j];
            let min = minOf(nums.filter(n => !isNaN(n)));
            if(min === m[i][j] && nums.filter(n => n===min).length === 1){
                let basin = getBasin(m, i, j) + 1;
                basins.push(basin);
            }
        }
    }


    basins = basins.sort((a,b)=> a-b);
    basins = basins.slice(-3)
    let produce = basins.reduce((acc, curr) => acc*curr, 1);
    console.log(basins, produce);
}

exports.run = run;