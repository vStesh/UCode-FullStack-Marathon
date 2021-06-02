'use strict'
import { HardWorker } from "./modules/hard-worker.js";

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