'use strict'

exports.checkDivision = (start = 1, finish = 60) => {

    if(start <= finish && (Number.isInteger(start) && Number.isInteger(finish))) {
        let isDivisible, result;
        for(let i = start; i <= finish; i++) {
            isDivisible = false;
            result = '';
            result = `The number ${i} `;
            if(i % 2 === 0) {
                result += 'is divisible by 2';
                isDivisible = true;
            }
            if(i % 3 === 0) {
                result += (isDivisible ? ', ' : '') + 'is divisible by 3';
                isDivisible = true;
            }
            if(i % 10 === 0) {
                result += (isDivisible ? ', ' : '') + 'is divisible by 10';
                isDivisible = true;
            }
            if(!isDivisible) {
                result += '-';
            }
            console.log(result);
        }
    } else {
        console.log("Неправильно указан диапазон чисел\n");
    }
}



/*
  Task name: Range
*/
/* file test.js */

// const i = require('./index');
//
// console.log('*** Range is 3 - 7 checkDivision(3,7) ***');
// i.checkDivision(3, 7);
//
// console.log('\n*** Range is 58 - ... checkDivision(58) ***');
// i.checkDivision(58);
//
// console.log('\n*** Range is ... - ... checkDivision() ***');
// i.checkDivision();
