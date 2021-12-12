const fs = require("fs");

function low(s){
    return s == s.toLowerCase();
}

function up(s){
    return s == s.toUpperCase();
}

let paths = [];

function visit(m, sNode, path) {
    let start = m[sNode];
    console.log('path', path);
    for(let n of start.filter(ns => ns !== 'start')){
        if(path?.indexOf(n) > -1 && n !== 'end' && low(n)){
            continue;
        }

        path = [...path, sNode];
        if (n === 'end'){
            path = [...path, n];
            paths.push([...path]);

            continue;
        }


        visit(m, n, path);
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

  let res = visit(map, 'start', []);

    console.log(map, paths, paths.length);
}

exports.run = run;