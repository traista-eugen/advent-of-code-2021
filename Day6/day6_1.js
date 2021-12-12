var fs = require('fs');

const days = 80;
const newCounter = 8;
const afterNewCounter = 6;
//primu coloana
//a doilea rand
async function run () {
    const fileContent = await fs.promises.readFile('./Day6/input.txt');
    const fishes = fileContent.toString().split(',');
    for(let day = 0; day < days; day ++){
        let fishCount = fishes.length;
        for(let i = 0; i < fishCount; i++){
            if(fishes[i] === 0) {
                fishes[i] = 6;
                fishes.push(8);
            }
            else {
                fishes[i]--
            };
        }

        //console.log(fishes);
    }

    console.log(fishes.length);
}

exports.run = run;