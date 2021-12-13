const fs = require("fs");

function low(s){
    return s == s.toLowerCase();
}

function up(s){
    return s == s.toUpperCase();
}

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

let paths = [];

function visit(m, sNode, path, occ) {
    let start = m[sNode];
    // if(low(sNode) && (twice && countOccurrences(path, sNode) === 2)){
    //     return;
    // }

    console.log('path', sNode, path);
    for(let n of start.filter(ns => ns !== 'start')){
        if(countOccurrences(path,n) >= occ && n !== 'end' && low(n) ){
            continue;
        }

        //path = [...path, sNode];

        if(low(n) && countOccurrences(path, n) + 1 === 2){
            occ = 1;
        }

        if (n === 'end'){
            path = [...path, n];
            paths.push([...path]);
            occ = 2;
            continue;
        }
        else {
            path = [...path, n];
        }


        visit(m, n, path, occ);
    }

    return;
}

async function run() {
    console.log('10');
    const fileContent = await fs.promises.readFile('./Day12/input.txt');
    const lines = fileContent.toString().split('\n');
    const map = {};

    for(let line of lines){
        let start = line.split('-')[0];
        let end = line.split('-')[1];
        if(!map[start]){
            map[start] = [end];
        }
        else {
            map[start] = [...map[start], end];
        }

        if(!map[end]){
            map[end] = [start];
        }
        else {
            map[end] = [...map[end], start];
        }
    }

    let res = visit(map, 'start', [], 2);

    console.log(map, paths, paths.length);
}

exports.run = run;