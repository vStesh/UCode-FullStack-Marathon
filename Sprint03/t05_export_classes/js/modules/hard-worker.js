'use strict'

class HardWorker {

    set age(value) {
        if(value < 100 && value >= 1) {
            this._age = value;
        }
    }
    get age() {
        return this._age;
    }
    set salary(value) {
        if(value >=100 && value < 10000) {
            this._salary = value;
        }
    }
    get salary() {
        return this._salary;
    }

    toObject() {
        return {name: this.name, age: this._age, salary: this._salary};
    }
}

export { HardWorker }