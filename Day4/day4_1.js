var fs = require('fs');

const draws = [72,99,88,8,59,61,96,92,2,70,1,32,18,10,95,33,20,31,66,43,26,24,91,44,11,15,48,90,27,29,14,68
    ,3,50,69,74,54,4,16,55,64,12,73,80,58,83,6,87,30,41,25,39,93,60,9,81,63,75,46,19,78,51,21,28,94,7,17,42,
    53,13,97,98,34,76,89,23,86,52,79,85,67,84,47,22,37,65,71,49,82,40,77,36,62,0,56,45,57,38,35,5];

async function run () {
    const fileContent = await fs.promises.readFile('./Day4/input.txt');
    const fileLines = fileContent.toString().split('\n');
    let matrixes = [];
    let matrix = [];
    for (const line of fileLines) {
        if(line === ''){
            matrixes.push([...matrix]);
            matrix = [];
            continue;
        }

        let row = line.split(' ').map(e => parseInt(e)).filter(e => !isNaN(e))
            .map(e => ({key: e, checked: 0}));
        matrix.push([...row]);
    }

    const toTake = 1;
    let winner = null;
    let winnerNumber = null;
    let currentDraw = draws.splice(0, toTake);
    while(winner == null && currentDraw.length > 0) {
        for (let matrix of matrixes) {
            for (let row of matrix) {
                for (let el of row) {
                    if (currentDraw.includes(el.key)) {
                        el.checked = 1;
                    }
                }
            }
        }

        winner = matrixes.find(m => m.some(r => r.every(e => e.checked))) ||
        matrixes.find(m => {
            let winnerMatrix = false;
            for (let i = 0; i < 5; i++){
                let columnChecked = true;
                for(let j = 0; j< 5; j ++){
                    columnChecked = columnChecked && m[j][i].checked;
                }

                if(columnChecked) {
                    winnerMatrix = true;
                    break
                }
            }

            return winnerMatrix;
        });
        winnerNumber = currentDraw;
        currentDraw = draws.splice(0, toTake);
    }

    for (let matrix of matrixes){
        for(row of matrix){
            console.log(row.map(e => e.checked ? 1 : 0));
        }
        console.log('================')
    }

    const uncheckedSum = winner.reduce((acc, row) => {
        return acc + row.filter(e => !e.checked).reduce((acc, el) => acc + el.key, 0);
    }, 0);

    console.log('winner', winner, 'winner number', winnerNumber, 'uncheked sum', uncheckedSum, 'result', uncheckedSum * winnerNumber);
}

exports.run = run;
