'use strict'

let guestList = new WeakSet;
let menu = new Map;
let bankVault = new WeakMap;
let coinCollection = new Set;


/*
* WeakSet - guestList
*/

let guestUsers = {
    u1: {name: 'Florin Bitcher'},
    u2: {name: 'Mark Zuckerberg'},
    u3: {name: 'Sergey Brin'},
    u4: {name: 'Vasyl Khmelnitski'},
    u5: {name: 'Jack Ma'},
    u6: {name: 'Bill Gates'},
}

guestList.add(guestUsers.u1);
guestList.add(guestUsers.u2);
guestList.add(guestUsers.u3);
guestList.add(guestUsers.u4);
guestList.add(guestUsers.u5);
guestList.add(guestUsers.u6);


console.log('------ Guest list:');
console.log('has user u5 in list? ' + guestList.has(guestUsers.u5));
console.log('delete user 5 ' + guestUsers.u5.name);

guestList.delete(guestUsers.u5);
console.log('has user in list? ' + guestList.has(guestUsers.u5));
console.log('size: ' + guestUsers.size);

/*
* Map - menu
*/

menu.set('Салат цезарь', 99)
    .set('Салат зимний', 69)
    .set('Суп рыбный', 32)
    .set('Солянка', 55)
    .set('Борщ оригинальный', 45)
    .set('Компот', 22);

getMenu();

function getMenu() {
    console.log('------- Menu list:');
    for (var [key, value] of menu) {
        console.log("Блюдо: " + key + " - цена: " + value +"грн\n");
    }
}

console.log('size: ' + menu.size);

/*
* WeakMap - bankVault
*/

let bankUsers = {
    u1: {name: 'Florin Bitcher'},
    u2: {name: 'Mark Zuckerberg'},
    u3: {name: 'Sergey Brin'},
    u4: {name: 'Vasyl Khmelnitski'},
    u5: {name: 'Jack Ma'},
    u6: {name: 'Bill Gates'},
}

bankVault.set(bankUsers.u1, ["1000 dollars", "50000 UAH", "Goldner Ear", "Book 1"]);
bankVault.set(bankUsers.u2, ["67 billions cash", "10 actions of Instagramm", "my first e-book", "paper box"]);
bankVault.set(bankUsers.u3, ["1 BTC on the flash drive", "ticket from Moscow", "Letter mail with domain registration Google.com"]);
bankVault.set(bankUsers.u4, ["Договор на аренду земли мотоциклетного завода", "Билет на Марс"]);
bankVault.set(bankUsers.u5, ["Список дел", "Маска бетмена", "Первый фотоаппарат"]);
bankVault.set(bankUsers.u6, ["Унитаз", "Диск 5 дюймов с МС-Дос 1.0"]);

console.log('------- Bank Safe for ' + bankUsers.u1.name + ': ' + bankVault.get(bankUsers.u1));
console.log('size: ' + bankVault.size);

/*
* Set - coinCollection
*/

coinCollection.add('1 doll 1890');
coinCollection.add('10 cent 1908');
coinCollection.add('1 UAH 2012');
coinCollection.add('1 doll 1890');
coinCollection.add('1 doll 1890');
coinCollection.add('1 doll 1890');

getCoins(coinCollection);

function getCoins(mySet) {
    console.log('------- Coins List:');
    for (let item of mySet) console.log(item);
}
console.log('size: ' + coinCollection.size);