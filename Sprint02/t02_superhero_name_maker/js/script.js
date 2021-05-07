"use strict"
let _animal = new RegExp(/^[a-zA-Z]{1,20}$/);
let _gender = new RegExp(/male|female/i );
let _age = new RegExp(/^[1-9][0-9]{0,4}$/);
let _empty = new RegExp(/^$/);

let i = false;
let animal, gender, age;
// Принимаем имя животного до длиной до 20 символов включительно, одно слово и только буквы
do {
    if(i) {
        alert('Error!  length <= 20, only one word that contains only letters');
    }
    animal = prompt('What animal is the superhero most similar to?');
    i = true;
}
while (!(_animal.test(animal)));
//alert(animal);


// Принимаем пол male, famale or blank
i = false;
do {
    if(i) {
        alert('Error!  accepts only male, female, or blank (not case sensitive)');
    }
    gender = prompt('Is the superhero male or female? Leave blank if unknown or other.');
    i = true;
}
while (!(_gender.test(gender) || _empty.test(gender)));
//alert(gender);

// Принимаем возраст только число длиной <=5 не начинается с 0
i = false;
do {
    if(i) {
        alert('Error!   length <= 5, only digits, cannot start with a zero');
    }
    age = prompt('How old is the superhero?');
    i = true;
}
while (!(_age.test(age)));
//alert(age);

let description;

if (gender.toLowerCase() === 'male') {
    if (age < 18) {
        description = 'boy';
    }
    else {
        description = 'man';
    }
}
if (gender.toLowerCase() === 'female') {
    if (age < 18 ) {
        description = 'girl';
    }
    else {
        description = 'woman';
    }
}
if (gender === '') {
    if (age < 18) {
        description = 'kid';
    }
    else {
        description = 'hero';
    }
}

alert(`The superhero name is: ${animal}-${description}!`);