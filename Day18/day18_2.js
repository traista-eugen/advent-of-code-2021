const fs = require("fs");


async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day18/input.txt');
    const line = fileContent.toString();
}

exports.run = run;