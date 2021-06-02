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

let worker = new HardWorker;
worker.name= 'Bruce';
console.log(worker.name);
// Bruce

worker.age = 50;
worker.salary= 1500;
console.log(worker.toObject());
// Object { name: "Bruce", age: 50, salary: 1500 }

worker.name= 'Linda';
worker.age = 140;
worker.salary= 15;
console.log(worker.toObject());
// Object { name: "Linda", age: 50, salary: 1500 }