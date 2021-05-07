let start, finish;

start = promptNumber('Введите начало диапазона - число от 1 до 100',1, 100);
finish = promptNumber('Введите конец диапазона - число от 1 до 100',1, 100);

checkDivision(start, finish);

function promptNumber(msg, start, finish) {
    let num;
    do {
        num = prompt(msg);
    }
    while (!(num >= start && num <= finish));
    return num;
}

function checkDivision(beginRange, endRange) {
    let res = '';
    let flag;
    for (let i = beginRange; i <= endRange; i++) {
        flag = false;
        if((i % 2) === 0 || (i % 3) === 0 || (i % 10) === 0) {
            res += i;
            if (i % 2 === 0) {
                res += ' is even';
                flag = true;
            }
            if (i % 3 === 0) {
                res += (flag ? ',' : '') + ' a multiple of 3';
                flag = true;
            }
            if (i % 10 === 0) {
                res += (flag ? ',' : '') + ' a multiple of 10';
            }
            res += '\n';
        }
        else {
            res += i + ' -\n';
        }
    }
    console.log(res);
}