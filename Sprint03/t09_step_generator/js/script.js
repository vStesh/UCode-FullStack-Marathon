'use strict'

let timer = true;

function* generator() {
    let index = 1;
    while(true) {
        let input = +prompt(`Previous result: ${index}. Enter a new number:`);

        if(isNaN(input)) {
            console.log('Invalid number!');
            yield;
        } else {
            index += input;
            if(index > 10000) {
                index = 1;
                yield;
            }
            yield index;

        }
    }
}

let gen = generator();
let count = +prompt('Сколько раз запустить генератор?');
for(let i = 1; i <= count; i++) {
    gen.next();
}


