const fs = require("fs");

let matrix = [];

function neighbourMinDistance(distances, visited){
    let minDistance = Infinity,
        min = null;
  //  let [i,j] = visited;

    for(let distance in distances){
        let [i,j] = distance.split(',').map(s => parseInt(s));
        if(i>10){
            let test= 1;
        }
        let distanceCost = matrix[i][j];
        if(distanceCost < minDistance && !visited.has(distance)) {
            minDistance = distance;
            min = distance;
        }
    }

    return min;
}

function dijkstra(source) {
    let distances = {};
    let parents = {};
    let visited = new Set();
    matrix.forEach((line, i) => {
        line.forEach((el, j)=>{
            if(i === source[0] && j === source[1]){
                distances[source] = 0;
            }
            else{
                distances[[i,j]] = Infinity;
            }

            parents[[i,j]] = null;
        });
    });

    let current = neighbourMinDistance(distances, visited);

    while(current !== null){
        let distance = distances[current];
        let [i,j] = current.split(',').map(s => parseInt(s));
        let neighbours = [
            [i-1,j],
            [i,j+1],
            [i+1,j],
            [i,j-1]
        ];

        for(let neighbour of neighbours){
            if(!matrix?.[neighbour[0]]?.[neighbour[1]]) continue;

            let newDistance = distance + matrix[neighbour[0]][neighbour[1]];
            if(distances[neighbour] > newDistance){
                distances[neighbour] = newDistance;
                parents[neighbour] = current;
            }
        }

        visited.add(current);
        current = neighbourMinDistance(distances, visited);
    }

    //console.log('parents', parents);
    let distanceValues =  Object.values(distances);
    console.log('distances',distances);
}

async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day15/input.txt');
    const line = fileContent.toString();

    let binary = '';
    let pos = 0;

    while(pos < line.length){
        binary+=line[0].toString(2)
    }

    dijkstra([0,0]);
    //console.log(matrix);
}

exports.run = run;