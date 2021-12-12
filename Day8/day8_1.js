const fs = require("fs");


async function run () {
    const fileContent = await fs.promises.readFile('./Day8/input.txt');
    const lines = fileContent.toString().split('\n');
    let result = [0,0,0,0,0,0,0,0];
    for(let line of lines) {
        let output = line.split('|')[1];
        let signals = output.split(' ');
        for (let signal of signals){
            result[signal.length]++;
        }
    }

    console.log(result)
    console.log(result[2] + result[3] + result[4] + result[7])
}

exports.run = run;