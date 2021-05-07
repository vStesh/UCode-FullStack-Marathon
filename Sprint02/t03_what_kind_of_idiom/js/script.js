"use strict"
let number, res;

do {
    number = prompt('Введите число от 1 до 10');
}
while (!(Number.isFinite(1*number) && number > 0 && number < 11));

switch (number) {
    case '1':
        res = 'Back to square 1';
        break;
    case '2':
        res = 'Goody 2-shoes';
        break;
    case '3':
    case '6':
        res = "Two's company, three's a crowd";
        break;
    case '4':
    case '9':
        res = 'Counting sheep';
        break;
    case '5':
        res = 'Take five';
        break;
    case '7':
        res = 'Seventh heaven';
        break;
    case '8':
        res = 'Behind the eight-ball';
        break;
    case '10':
        res = 'Cheaper by the dozen';
        break;
}

alert (res);