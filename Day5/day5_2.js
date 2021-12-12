var fs = require('fs');

//primu coloana
//a doilea rand
async function run () {
    const fileContent = await fs.promises.readFile('./Day5/input.txt');
    const lines = fileContent.toString().split('\n');

    const coordinates = [];
    for (const line of lines) {
        const parts = line.split(' -> ');
        const s = parts[0].split(',').map(s => parseInt(s));
        const d = parts[1].split(',').map(d => parseInt(d));

        if(s[1] === d[1]){
            //console.log(s, d);
            const row = s[1];
            if(!coordinates[row]){
                coordinates[row] = [];
            }
            const xStart = Math.min(s[0], d[0]);
            const xEnd = Math.max(s[0], d[0]);
            // console.log('going from', xStart, 'to', xEnd, 'on row', row);
            for (let col=xStart; col < xEnd +1; col++){
                if(!coordinates[row][col]){
                    coordinates[row][col]=1;
                    // console.log('creating', coordinates[s[0]][i]);
                }
                else{
                    coordinates[row][col]++;
                    // console.log('intersecting', coordinates[s[0]][i])
                }
            }
        }

        else if(s[0] === d[0]){
            // console.log(s, d);
            const col = s[0];
            const yStart = Math.min(s[1], d[1]);
            const yEnd = Math.max(s[1], d[1]);
            // console.log('going from', yStart, 'to', yEnd, 'on col', col);
            for(let row = yStart; row < yEnd + 1; row++){
                if(!coordinates[row]){
                    coordinates[row] = [];
                }
                // console.log(s[0], i);
                if(!coordinates[row][col]) {
                    coordinates[row][col] = 1;
                    // console.log('creating', coordinates[s[0]][i]);
                }
                else
                {
                    coordinates[row][col]++;
                    // console.log('intersecting', coordinates[s[0]][i])
                }
            }
        }
        else {
            let rowStart = s[1];
            let rowEnd = d[1];

            let colStart = s[0];
            let colEnd = d[0];

            let col = colStart;
            if(rowStart < rowEnd) {
                for (let row = rowStart; row < rowEnd + 1; row++) {
                    let stop = false;
                    console.log('row', rowStart, rowEnd)
                    if (!coordinates[row]) {
                        coordinates[row] = [];
                    }


                    if (!coordinates[row][col]) {
                        coordinates[row][col] = 1;
                    } else {
                        coordinates[row][col]++;
                    }

                    if(colEnd > colStart) {
                        col++;
                    }
                    else if(colStart > colEnd){
                        col--;
                    }
                }
            }
            else if(rowStart > rowEnd){
                for (let row = rowStart; row > rowEnd - 1; row--) {
                    let stop = false;
                    console.log('row', rowStart, rowEnd)
                    if (!coordinates[row]) {
                        coordinates[row] = [];
                    }


                    if (!coordinates[row][col]) {
                        coordinates[row][col] = 1;
                    } else {
                        coordinates[row][col]++;
                    }

                    if(colEnd > colStart) {
                        col++;
                    }
                    else if(colStart > colEnd){
                        col--;
                    }
                }
            }
        }
    }

    console.log('coord', Array.isArray(coordinates));
    let results = 0;
    for(let i=0;i<coordinates.length; i++){
        // console.log('row', coordinates[i]);
        const row = coordinates[i];

        if(!row){
            continue;
        }
        for(let j=0; j < row.length; j++){
            const el = coordinates[i][j];
            if(el>1){
                results++;
            }
        }
    }
    // for(let row of coordinates){
    //     console.log('row', row);
    //     for(let el of row){
    //         //console.log(coordinates[row]);
    //
    //         if(el> 1){
    //             //console.log(coordinates[row][el])
    //             results++;
    //         }
    //     }
    // }
    // console.log(coordinates[250])
    console.log(coordinates);
    console.log('results', results);
    // for (let row in coordinates){
    //         console.log(coordinates[row]);
    // }
}


exports.run = run;
