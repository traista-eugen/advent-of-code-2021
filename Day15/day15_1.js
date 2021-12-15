const fs = require("fs");

async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day14/input.txt');
    const lines = fileContent.toString().split('\n');
}

exports.run = run;