'use strict'
const mysql = require('mysql2');
const User = require('./models/user');
const db = require('./config.json');
const fs = require('fs');
const crypt = require('bcryptjs');

exports.addUser = async function (request, response){
    let valid = await validate(request.body);
    console.log("valid--- " + valid.status);
    if(valid.status) {
        let user = new User();
        console.log(request.body);
        user.save({
            full_name: request.body.name,
            login: request.body.login,
            password: await crypt.hash(request.body.password, 8),
            email: request.body.email
        });
        response.redirect('/done');
    } else {
        response.send(getIndex(`<div class='error-box'>Error!!! ${valid.error}</div>`));
    }

};
// exports.getUsers = function(request, response){
//     response.send("Список пользователей");
// };
exports.index = function(request, response) {
    response.send(getIndex());
}
exports.done = function(request, response) {
    response.redirect("/done.html");
}

async function validate(data) {
    let user = new User();
    let result, result1;
    let error = '';
    // check user login
    result = await user.getList({
            login: data.login,
    });
    // console.log("result ---- " + result);
    // console.log("length ---- " + result.length);
    if(result.length > 0) {
        error += "Такой логин уже существует! ";
    }
    // check email
    result1 = await user.getList({
        email: data.email
    });
    if(result1.length > 0) {
        error += "Такой email уже используется! ";
    }

    return {status: !(result.length + result1.length), error: error};
}
function getIndex(insert = false) {
    try {
        const data = fs.readFileSync(__dirname + '/public/register.html', 'utf-8');
        return (data && insert) ? data.replace("#TEXT#", insert) : data.replace("#TEXT#", '');
    } catch (err) {
        console.error(err);
    }
    return false;

}