const fs = require("fs");

function getNumbers(stringNumber) {
    let arr = new Array(7).fill(0);
    for (let letter of stringNumber) {
        switch (letter) {
            case 'a':
                arr[0] = 1;
                break;
            case 'b':
                arr[1] = 1;
                break;
            case 'c':
                arr[2] = 1;
                break;
            case 'd':
                arr[3] = 1;
                break;
            case 'e':
                arr[4] = 1;
                break;
            case 'f':
                arr[5] = 1;
                break;
            case 'g':
                arr[6] = 1;
                break;
        }
    }

    return arr;
}

function getValue(numRev, num) {
    return [...numRev[num]];
}

function add(a, b){
    for(let i=0; i<7; i++){
        a[i] += b[i];
    }

    return a;
}

function sub(a, b){
    for(let i=0; i<7; i++){
        a[i] -= b[i];
    }

    return a;
}

function similar(vals, num) {
    let aux = 7;
    let closer = new Array(7).fill(0);
    for(let v of vals){
        let val = 0;
        for(let i = 0; i<7;i++){
            val += v[i] -  num[i] > 0 ? 1 : 0;
        }
        if(val<aux){
            closer = v;
            aux = val;
        }
    }

    return closer;
}

function map(input){
    let num = {};
    let numRev = {}

    let five = [];
    let six = [];

    for(let n of input.split(' ')){
        if(n.length == 2){
            num[getNumbers(n)] = 1;
            numRev[1] = getNumbers(n)
        }
        else if(n.length == 3){
            num[getNumbers(n)] = 7;
            numRev[7] = getNumbers(n)
        }
        else if(n.length == 4){
            num[getNumbers(n)] = 4;
            numRev[4] = getNumbers(n)
        }
        else if(n.length == 7){
            num[getNumbers(n)] = 8;
            numRev[8] = getNumbers(n)
        }
        else if(n.length == 5){
            five.push(getNumbers(n))
        }
        else if(n.length == 6){
            six.push(getNumbers(n))
        }
    }

    let a = getValue(numRev, 7);
    a = sub(a, getValue(numRev, 1));
    a = add(a, getValue(numRev, 4));

    let nine = similar(six, a);
    num[nine] = 9;
    numRev[9] = nine;

    //six[]
    let rf = six.findIndex(v => arraysEqual(v, nine));
    six.splice(rf,1);

    let theFive = [...nine];
    theFive = sub(theFive, getValue(numRev, 1));
    let foundFive = similar(five, theFive);

    num[foundFive] = 5;
    numRev[5] = foundFive;
    rf = five.findIndex(v => arraysEqual(v, foundFive));
    five.splice(rf,1);

    let findThree = getValue(numRev, 5);
    findThree = sub(findThree, getValue(numRev, 4))
    findThree = sub(findThree, getValue(numRev, 1))
    let foundThree = similar(five, findThree);

    num[foundThree] = 3;
    numRev[3] = foundThree;
    rf = five.findIndex(v => arraysEqual(v, foundThree));
    five.splice(rf,1);

    let foundTwo = five[0];
    num[foundTwo] = 2;
    numRev[2] = foundTwo;
    five.length = 0;


    let findZero = getValue(numRev, 2);
    let gotFour = getValue(numRev, 4)
    findZero = sub(findZero, gotFour);
    findZero = add(findZero, getValue(numRev, 1));
    let foundZero = similar(six, findZero);

    num[foundZero] = 0;
    numRev[0] = foundZero;
    rf = six.findIndex(v => arraysEqual(v, foundZero));
    six.splice(rf,1);

    let foundSix = six[0];
    num[foundSix] = 6;
    numRev[6] = foundSix;
    six.length = 0;

    return num;
}

function arraysEqual(a,b){
    for(let i=0;i<7;i++){
        if(a[i] !== b[i])
            return false;
    }

    return true;
}

function getMapByValue(map, val) {
    for(let m of Object.keys(map)){
        if(arraysEqual(m.split(',').map(e => parseInt(e)), val))
        {
            return map[m];
        }
    }

    return null;
}

async function run() {
    const fileContent = await fs.promises.readFile('./Day8/input.txt');
    const lines = fileContent.toString().split('\n');
    let total = 0;
    for (let line of lines) {
        const input = line.split('|')[0];
        const output = line.split('|')[1];
        let numbers = map(input);

        let outNum = 0;
        for(let o of output.trim().split(' ')){
            let num = getNumbers(o);

            let outVal = getMapByValue(numbers, num);
            if(outVal !== null){
                outNum *= 10;
                outNum += outVal;
            }


        }

        total+=outNum;

        console.log(outNum);

    }

    console.log(total);
}

exports.run = run;