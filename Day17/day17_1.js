const fs = require("fs");


async function run() {
    console.log('17_1');
    const fileContent = await fs.promises.readFile('./Day17/input.txt');
    const line = fileContent.toString();
}

exports.run = run;