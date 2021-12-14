const fs = require("fs");

async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day14/input.txt');
    const lines = fileContent.toString().split('\n');
    const template = lines[0];
    lines.splice(0,2);
    const pairs = lines;

    let pairsMap = {};
    for(let pair of pairs){
        let splitPair = pair.split('->');
        let pairK = splitPair[0].trim();
        let pairV = splitPair[1].trim();
        pairsMap[pairK] = pairV;
    }

    console.log(pairsMap);

    let step = 0;
    const templateArray = [...template];
    console.log(templateArray);
    let steps = 40;
    while(step < steps) {
        let i=0;
        while(i < templateArray.length-1)
        {
            const tempK = templateArray[i] + templateArray[i+1];
            const tempVal = pairsMap[tempK];
            if(tempVal) {
                templateArray.splice(i + 1, 0, tempVal);
                i=i+2;
            }
        }

        console.log('step', step);
        step++;
    }

    const occurances = {};
    for(let el of templateArray){
        if(!occurances[el])
            occurances[el]=1;
        occurances[el]++;
    }

    const min = Math.min(...Object.values(occurances));
    const max = Math.max(...Object.values(occurances));
    console.log(templateArray.join(''))
    console.log(templateArray, templateArray.length, occurances, max-min);
}

exports.run = run;