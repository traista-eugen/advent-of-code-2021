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
    console.log('path', path);
    for(let n of start.filter(ns => ns !== 'start')){
        if(countOccurrences(path,n) >= occ && n !== 'end' && low(n) ){
            continue;
        }

        if(low(sNode) && countOccurrences(path, sNode) + 1 === 2){
            occ = 1;
        }

        path = [...path, sNode];
        if (n === 'end'){
            path = [...path, n];
            paths.push([...path]);
            continue;
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