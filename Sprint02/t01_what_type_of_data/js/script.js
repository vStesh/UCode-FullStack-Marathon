"use strict"

let num = 12345.456
let bigInt = 12398983458762736478798534n;
let str = 'kjf kf lkdsfj   asd ';
let bool = true;
let $null = null;
let undef; //undefined;
let obj = new Object();
let id = Symbol('id');
obj = {name:'John', age: 25};
function MyFunct () {
    return '3';
}

let res = 'num is ' + typeof(num) + '\n';
res += 'bigInt is ' + typeof(bigInt) + '\n';
res += 'str is ' + typeof(str) + '\n';
res += 'bool is ' + typeof(bool) + '\n';
res += '$null is ' + typeof($null) + '\n';
res += 'undef is ' + typeof(undef) + '\n';
res += 'obj is ' + typeof(obj) + '\n';
res += 'id is ' + typeof(id) + '\n';
res += 'MyFunct is ' + typeof(MyFunct) + '\n';


alert(res);

