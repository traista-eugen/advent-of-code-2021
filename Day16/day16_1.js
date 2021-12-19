const fs = require("fs");
let versionSum = 0;

function parseSub(p, bin) {
    if(p > 4000){
        let test= 344;
    }

    console.log('binary', bin)
    let version = parseInt(bin.slice(p,p+=3), 2);
    versionSum+=version;
    let typeId = parseInt(bin.slice(p,p+=3), 2);
    console.log('version', version, bin.slice(3,6), 'type id', typeId);
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

        console.log('word', word, parseInt(word, 2));
    }
    else{
        let lengthTypeId = parseInt(bin.slice(p,p+=1),2);
        if(lengthTypeId === 0){
            let length = parseInt(bin.slice(p,p+=15),2);
            let newPos = parseSub(p, bin);
            let sum =  newPos-p;
            p = newPos;
            while(sum < length){
                newPos = parseSub(p, bin);
                sum += newPos - p;
                p = newPos;
            }

        }
        else  if(lengthTypeId === 1){
            let number = parseInt(bin.slice(p,p+=11),2);
            let newPos = parseSub(p, bin);
            p = newPos;
            let count = 1;
            while (count < number){
                let newPos = parseSub(p, bin);
                count++;
                p = newPos;
            }
        }

       // let newPos = parseSub(p, bin);

    }

    return p;
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


   parseSub(0,binary);
    console.log('global version', versionSum);
}

exports.run = run;