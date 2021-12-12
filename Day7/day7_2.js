var fs = require('fs');

function calculateFuel(positions) {
    let ini = positions;
    let fuelPerMove = 1;
    let fuel = 0;
    while (positions > 0){
        fuel += fuelPerMove;
        fuelPerMove++;
        positions--;
    }

  //  console.log(ini, fuel);
    return fuel;
}

async function run () {
    const fileContent = await fs.promises.readFile('./Day7/input.txt');
    const positions = fileContent.toString().split(',')
        .map(p => parseInt(p));

    let diferrences = positions.map(p => 0);
    for(let i =0;i<positions.length; i++){
        for(let j=0;j<Math.max(...positions); j++) {
            diferrences[j] += calculateFuel(Math.max(positions[i], j) -
                Math.min(positions[i], j));
           // console.log('from', positions[i], 'to', j, diferrences[i])
        }
    }

   // console.log('positions', positions, diferrences);
   // diferrences = diferrences.map(p => calculateFuel(p));
     console.log(Math.min(...diferrences.filter(d => !isNaN(d))));
   // console.log(calculateFuel(9));
}

exports.run = run;