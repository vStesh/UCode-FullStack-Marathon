'use strict'

const houseBlueprint = {
    address: null,
    date: null,
    description: null,
    _building_speed: 0.5,
    owner: null,
    size: null,
    getDaysToBuild: function() {
        return (this.size / this._building_speed);
    }
}

const house= new HouseBuilder('88 Crescent Avenue',
    'Spacious town house with wood flooring, 2-car garage, and a back patio.',
    'J. Smith', 110, 5);

let houseMixin = {
    wordReplace(a, b) {
        this.description = this.description.replace(a,b);
    },
    wordInsertAfter(a, b) {
        this.description = this.description.split(' ').map(e => (e === a) ? (e + ' ' + b) : e ).join(' ');
    },
    wordDelete(a){
        this.wordReplace(a, '');
    },
    wordEncrypt() {
        // let code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'.split("");
        let code = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'];
        // this.description = this.description.split("").map(e => code.includes(e) ? code[code.indexOf(e) + 13] : e).join("");
        this.description = [...this.description].map(e => code.includes(e) ? code[code.indexOf(e) + 13] : e).join("");
    },
    wordDecrypt() {
        this.wordEncrypt();
    }
}

Object.assign(house, houseMixin);
console.log(house.getDaysToBuild());
// 220
console.log(house.description);
// Spacious town house with wood flooring, 2-car garage, and a back patio.
house.wordReplace("wood", "tile");
console.log(house.description);
// Spacious town house with tile flooring, 2-car garage, and a back patio.
house.wordDelete("town ");
console.log(house.description);
// Spacious house with tile flooring, 2-car garage, and a back patio.
house.wordInsertAfter("with", "marble");
console.log(house.description);
// Spacious house with marble tile flooring, 2-car garage, and a back patio.
house.wordEncrypt();
console.log(house.description);
// Fcnpvbhf ubhfr jvgu zneoyr gvyr sybbevat, 2-pne tnentr, naq n onpx cngvb.
house.wordDecrypt();
console.log(house.description);
// Spacious house with marble tile flooring, 2-car garage, and a back patio.



