const fs = require("fs");

const char_table = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

const map = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

const reverseMap = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
}

async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day10/input.txt');
    const lines = fileContent.toString().split('\n');

    let invalid = [];
    for(line of lines){
        const latestOpen = [];
        for(let chr of line) {
            if(map[chr]){
                latestOpen.push(chr);
            }

            if(reverseMap[chr]){
                if(latestOpen[latestOpen.length-1] === reverseMap[chr]){
                    latestOpen.splice(latestOpen.length-1, 1);
                }
                else
                {
                    invalid.push(chr);
                    break;
                }
            }
        }

    }

    const invalidMap = {
        ')': 0,
        ']': 0,
        '}': 0,
        '>': 0
    }

    for(let inv of invalid){
        invalidMap[inv]++;
    }

    let sum =0;
    for(let invK in invalidMap){
        sum += invalidMap[invK] * char_table[invK];
    }

    console.log('sum',sum);

}

exports.run = run;