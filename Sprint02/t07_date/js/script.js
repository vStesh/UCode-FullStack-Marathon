let arrWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];


function getFormattedDate(dateObject) {
    let res = '';

    res +=      new Intl.NumberFormat('en-IN', {minimumIntegerDigits: 2}).format(dateObject.getDate()) + '.'
            +   new Intl.NumberFormat('en-IN', {minimumIntegerDigits: 2}).format((dateObject.getMonth() + 1)) + '.'
            +   dateObject.getFullYear() + ' '
            +   new Intl.NumberFormat('en-IN', {minimumIntegerDigits: 2}).format(dateObject.getHours()) + ':'
            +   new Intl.NumberFormat('en-IN', {minimumIntegerDigits: 2}).format(dateObject.getMinutes()) + ' '
            +   arrWeek[dateObject.getDay()];
    return res;
}

// const date0= new Date(1993, 11, 1);
// const date1= new Date(1998, 0, -33);
// const date2= new Date('42 03:24:00');
// console.log(getFormattedDate(date0));// 01.12.1993 00:00 Wednesday
// console.log(getFormattedDate(date1));// 28.11.1997 00:00 Friday
// console.log(getFormattedDate(date2));// 01.01.2042 03:24 Wednesday