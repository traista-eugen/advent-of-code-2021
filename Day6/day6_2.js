var fs = require('fs');

const days = 256;
const newCounter = 8;
const afterNewCounter = 6;
//primu coloana
//a doilea rand
async function run () {
    const fileContent = await fs.promises.readFile('./Day6/input.txt');
    const fishes = fileContent.toString().split(',');
    var fish = [0,0,0,0,0,0,0,0,0]
    for(let f of fishes){
        fish[f]++;
    }


    for(let day = 0; day < days; day ++){
        let fishCount = fish.length;
        let increase = fish[0];
        for(let i = 1; i < fishCount + 1; i++){
            fish[i-1] = fish[i]
        }

        fish[8] = increase;
        fish[6] += increase
    }


    console.log(fish);
    console.log(fish.reduce((acc, curr) => acc+curr,0))
}

exports.run = run;