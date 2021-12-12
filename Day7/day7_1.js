var fs = require('fs');

function calculateFuel(positions) {
    let fuelPerMove = 1;
    let fuel = 0;
    while (positions > 0){

        console.log(fuel, fuelPerMove);
        fuel += fuelPerMove;
        fuelPerMove++;
        positions--;
    }

    return fuel;
}

async function run () {
    const fileContent = await fs.promises.readFile('./Day7/input.txt');
    const positions = fileContent.toString().split(',')
        .map(p => parseInt(p));

    let diferrences = positions.map(p => 0);
    for(let i =0;i<positions.length; i++){
        for(let j=0;j<positions.length; j++)
        diferrences[i] += Math.max(positions[i], positions[j]) -
            Math.min(positions[i], positions[j]);
    }

    //console.log('positions', diferrences);
    console.log(Math.min(...diferrences));
    //console.log(calculateFuel(11));
}

exports.run = run;