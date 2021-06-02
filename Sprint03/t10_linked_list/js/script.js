'use strict'

class LinkedList {
    data;
    _next;
    constructor(arr) {
        if(Array.isArray(arr)) {
            this.data = arr;
        } else {
            this.data = [];
        }

    }
    *[Symbol.iterator]() {
        for(let item of this.data) {
            yield item;
        }
    }
    _next = this[Symbol.iterator]();
    next() {
        return this._next.next();
    }
    add(value) {
        this.data.push(value);
    }
    remove(value) {
        let res = false;
        this.data = this.data.filter((e) => {
            if(!res && e === value) {
                res = true;
            } else {
                return e;
            }
        });
        return res;
    }
    contains(value) {
        return this.data.includes(value);
    }
    clear() {
        this.data = [];
    }
    count() {
        return this.data.length;
    }
    log() {
        console.log(this.data.join(', '));
    }
}

let createLinkedList = (arr) => {

    return new LinkedList(arr);
}

// const ll = createLinkedList([100, 1, 2, 3, 100, 4, 5, 100]);
// console.log(ll);
// console.log(ll.count());
// ll.log();
// // "100, 1, 2, 3, 100, 4, 5, 100"
// ll.remove(100);
// ll.log();
// // "1, 2, 3, 100, 4, 5, 100"
// while(ll.remove(100));
// ll.log();// "1, 2, 3, 4, 5"
// ll.add(10);
// ll.log();
// // "1, 2, 3, 4, 5, 10"
// console.log(ll.contains(10));
// console.log(ll.next().value);
// console.log(ll.next().value);
// console.log(ll.next().value);
// console.log(ll.next().value);
// console.log(ll.next().value);
// console.log(ll.next().value);
// console.log(ll.next().value);
// // console.log(ll.next().value);
//
// // "true"
// let sum = 0;
// for(const n of ll) {
//     sum += n;
// }
// console.log(sum);
// // "25"
// ll.clear();
// ll.log();
// // ""