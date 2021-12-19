const fs = require("fs");
let versionSum = 0;

function parseSub(p, bin) {
    if(p > 5400){
        let test= 344;
    }

    let version = parseInt(bin.slice(p,p+=3), 2);
    versionSum+=version;
    let typeId = parseInt(bin.slice(p,p+=3), 2);
    if(typeId === 4){
        let more = true;
        let word = ''
        while (more) {
            let literal = bin.slice(p, p+=5);
            if(literal[0] === '0'){
                more = false;
            }

            let valuePart = literal.slice(1,5);
            word += valuePart;
        }

        let parsedLit = parseInt(word, 2);
        return [p, parsedLit];
    }
    else{
        let childVals = [];
        let lengthTypeId = parseInt(bin.slice(p,p+=1),2);
        if(lengthTypeId === 0){
            let length = parseInt(bin.slice(p,p+=15),2);
            let [newPos, val] = parseSub(p, bin);
            if(val !==null) childVals.push(val);
            else childVals = [];
            let sum =  newPos-p;
            p = newPos;
            while(sum < length){
                let [newPos, val] = parseSub(p, bin);
                if(val !==null) childVals.push(val);
                else childVals = [];
                sum += newPos - p;
                p = newPos;
            }

        }
        else  if(lengthTypeId === 1){
            let number = parseInt(bin.slice(p,p+=11),2);
            let [newPos, val] = parseSub(p, bin);
            if(val !==null) childVals.push(val);
            else childVals = [];
            p = newPos;
            let count = 1;
            while (count < number){
                let [newPos, val] = parseSub(p, bin);
                if(val !==null) childVals.push(val);
                else childVals = [];
                count++;
                p = newPos;
            }
        }

        switch (typeId) {
            case 0:
                console.log('summing', childVals.filter(v => v !== null).join(','))
                return [p, childVals.filter(v => v !== null).reduce((acc, curr) => acc+curr, 0)];
            case 1:
                console.log('product', childVals.filter(v => v !== null).join(','))
                return [p, childVals.filter(v => v !== null).reduce((acc, curr) => acc*curr, 1)];
            case 2:
                console.log('min', childVals.filter(v => v !== null).join(','))
                return [p, Math.min(...childVals.filter(v => v !== null))];
            case 3:
                console.log('max', childVals.filter(v => v !== null).join(','))
                return [p, Math.max(...childVals.filter(v => v !== null))];
            case 5:
                console.log('greater', childVals.filter(v => v !== null).join(','))
                return [p, childVals[0]>childVals[1] ? 1 : 0];
            case 6:
                console.log('lower', childVals.filter(v => v !== null).join(','))
                return [p, childVals[0]<childVals[1] ? 1 : 0];
            case 7:
                console.log('equal', childVals.filter(v => v !== null).join(','))
                return [p, childVals[0]===childVals[1] ? 1 : 0];
        }
    }
}

async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day16/input.txt');
    const line = fileContent.toString();

    let binary = '';
    let pos = 0;

    while(pos < line.length){
        binary+=parseInt(line[pos], 16).toString(2).padStart(4, '0');
        pos++
    }


    let result = parseSub(0,binary);
    console.log('global version', versionSum, result, binary.length);
}

exports.run = run;