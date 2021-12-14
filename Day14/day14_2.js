const fs = require("fs");

async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day14/input.txt');
    const lines = fileContent.toString().split('\n');
    const template = lines[0];
    lines.splice(0,2);
    const pairs = lines;

    let pairsMap = {};
    const occurances = {};
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
    let steps = 10;
    pairOcc = {};
    
    for (let i=0; i < templateArray.length-1;i++){
        const tempK = templateArray[i] + templateArray[i+1];
        if(!pairOcc[tempK]) {
            pairOcc[tempK] = 1;
            continue;
        }

        pairOcc[tempK]++;
    }

    console.log(pairOcc)
    let l = templateArray.length;
    while(step < steps) {
        let tempOcc = {}
        let occKeys = Object.keys(pairOcc);
        for(let p of occKeys){
            const tempv = pairsMap[p];
            const newLeftPair = p[0] + tempv;
            const newRightPair = tempv + p[1];
            if(!tempOcc[newLeftPair]) {
                tempOcc[newLeftPair] = 1;
                //continue;
            }
            else tempOcc[newLeftPair]++;

            if(!tempOcc[newRightPair]) {
                tempOcc[newRightPair] = 1;
                //continue;
            }
            else tempOcc[newRightPair]++;

            // if(!occurances[tempv]) {
            //     occurances[tempv] = 1;
            //     //continue;
            // }
            // else occurances[tempv]+= pairOcc[p];
        }

        pairOcc = tempOcc;

        console.log('step', step, occurances, pairOcc);
        step++;
    }


    // for(let el of templateArray){
    //     if(!occurances[el])
    //         occurances[el]=1;
    //     occurances[el]++;
    // }

    for(let k in pairOcc){
        let firstL = k[0];
        if(!occurances[firstL])
            occurances[firstL]=pairOcc[k];
        else occurances[firstL]+=pairOcc[k];
    }

    const min = Math.min(...Object.values(occurances));
    const max = Math.max(...Object.values(occurances));
    // console.log(templateArray.join(''))
    console.log(occurances, max, min, max-min);
}

exports.run = run;