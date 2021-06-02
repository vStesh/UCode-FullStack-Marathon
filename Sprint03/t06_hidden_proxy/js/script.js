'use strict'

const validator = {
    set(target, property, value, receiver) {

        if(property === 'age' && !(Number.isInteger(value))) {
            throw new Error('The age is not an integer');
        }
        if(property === 'age' && (value < 0 || value > 200)) {
            throw new Error('The age is invalid');
        }
        target[property] = value;
        console.log(`Setting value '${value}' to '${property}'`);
        return true;
    },
    get(target, key) {
        console.log(`Trying to access the property '${key}'...`);
        if(!(key in target)) {
            return false;
        }
        return target[key];
    }
}


// let person= new Proxy({},validator);
//
// person.age = 100;
// // Setting value'100' to 'age'
// console.log(person.age);
// // Trying to access the property'age'...
// // 100
// person.gender= "male";
// // Setting value'male' to 'gender'°
// person.age = 'young';
// // Uncaught TypeError: The age is not an integer
// person.age = 300;
// // Uncaught RangeError: The age is invalid