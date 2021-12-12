const fs = require("fs");

const char_table = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
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
    let latestOpen = [];
    for(line of lines){
        let pass = false;
        for(let chr of line) {
            if(map[chr]){
                latestOpen.push(chr);
            }

            if(reverseMap[chr]){
                if(latestOpen[latestOpen.length-1] === reverseMap[chr]){
                    latestOpen.splice(latestOpen.length-1, 1);
                }

                else{
                    pass = true;
                    break;
                }
            }
        }

        if(!pass) {
            invalid.push(
                [...latestOpen.reverse().map(lo => map[lo])]);
        }
latestOpen = [];
        // console.log(invalid);
    }

    const invalidMap = {
        ')': 0,
        ']': 0,
        '}': 0,
        '>': 0
    }

     console.log(invalid);
    let scores = [];
    for(let inv of invalid){
        let sum = 0;
        for(let invC of inv){
            sum = sum * 5 + char_table[invC];
        }

        scores.push(sum);
    }


    scores = scores.sort((a,b) => a-b);
    console.log(scores, Math.floor(scores.length/2));
    console.log(scores[Math.floor(scores.length/2)])

}

exports.run = run;