'use strict'

module.exports = class StrFrequency {
    value;
    capsValue;
    letters = {};
    words = {};

    constructor(str) {
        this.value = str;
        this.capsValue = str.toUpperCase();
    }

    letterFrequencies() {
        for(let i = 0; i < this.capsValue.length; i++) {
            if(!(new RegExp(/[A-Z]/).test(this.capsValue[i]))) {
                continue;
            }
            this.letters[this.capsValue[i]] = this.letters[this.capsValue[i]] ? this.letters[this.capsValue[i]] + 1 : 1;
        }
        return this.letters;
    }
    wordFrequencies() {
        let result = '';
        for(let i = 0; i < this.capsValue.length; i++) {
            if(!(new RegExp(/[A-Z\s]/).test(this.capsValue[i]))) {
                continue;
            }
            result += this.capsValue[i];
        }
        result.split(' ').map(item => {
            if(item.length > 0) {
                this.words[item] = this.words[item] ? this.words[item] + 1 : 1;
            }
        });
        return this.words;
    }
    reverseString() {
        return [...this.value].reverse().join('');
    }
}




/*
  Task name: String frequency
*/
/* file test.js */
//
// const StrFrequency = require('./str-frequency');
//
// function test(str) {
//     const sf = new StrFrequency(str);
//     console.log(`Letters in ${str}`);
//     for (const [k, v] of Object.entries(sf.letterFrequencies())) {
//         console.log(`Letter ${k} is repeated ${v} times`);
//     }
//
//     console.log(`Words in ${str}`);
//     for (const [k, v] of Object.entries(sf.wordFrequencies())) {
//         console.log(`Word ${k} is repeated ${v} times`);
//     }
//
//     console.log(`Reverse of the string: ${str}`);
//     console.log(`${sf.reverseString()}`);
// }
//
// test("Face it, Harley-- you and your Puddin' are kaput!");
// console.log('*************');
// test('  Test test 123 45 !0 f   HeLlO wOrLd  ');
// console.log('*************');
// test('');
