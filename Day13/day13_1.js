const fs = require("fs");

async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day13/input.txt');
    const lines = fileContent.toString().split('\n');
    console.log('test', lines, lines.indexOf(''));
    let lastLines = lines.splice(lines.indexOf('') + 1, lines.length - lines.indexOf(''));
    console.log('last lines', lastLines);
    let m = {};
    for(let line of lines) {
        let parts = line.split(',');
        let x = parts[1];
        let y = parts[0];
        if(!m[x]){
            m[x] = {};
        }

        m[x][y] = 1;
    }

    // let visible = 0;
    let foldAlongY = lastLines[1].split('=')[1];
    // for(let rowK in m){
    //     let row = m[rowK];
    //     for(let elK in row){
    //         let el = row[elK];
    //         if(parseInt(rowK) > foldAlongY) {
    //             let rowDif = rowK - foldAlongY;
    //             if(rowDif < 0){
    //                 break;
    //             }
    //             let newRow = foldAlongY - rowDif;
    //             console.log(newRow, elK);
    //             if(!m[newRow]){
    //                 m[newRow] = {};
    //             }
    //
    //             m[newRow][elK] = 1;
    //         }
    //
    //         if(m?.[rowK]?.[elK] === 1){
    //             visible++;
    //         }
    //     }
    // }
    let foldAlongX = lastLines[0].split('=')[1];
    let newM = {};
    for(let rowK in m){
        let row = m[rowK];
        if(rowK === 'undefined'){
            break;
        }
        for(let elK in row){
            let el = row[elK];
            if(parseInt(elK) > foldAlongX) {
                let elDif = elK - foldAlongX;
                if(elDif < 0){
                    break;
                }

                let newCol = foldAlongX - elDif;

                console.log(newCol, elK);
                if(!newM[rowK]){
                    newM[rowK] = {};
                }

                newM[rowK][newCol] = 1;
                // visible++;
            }
            else {
                if(!newM[rowK]){
                    newM[rowK] = {};
                }
                newM[rowK][elK] = m[rowK][elK];
            }

            if(newM?.[rowK]?.[elK] === 1){
                // visible++;
            }
        }
    }

    let visible = 0;
    for(let rowK in newM) {
        let row = newM[rowK];
        if (rowK === 'undefined') {
            break;
        }
        for (let elK in row) {
            console.log('g', rowK, elK, newM[rowK][elK])
           // if (parseInt(newM[rowK][elK]) === 1) {
                visible++;
          //  }
        }
    }


    console.log('matrix', m, newM,foldAlongX);
    console.log('visible', visible);
}

exports.run = run;