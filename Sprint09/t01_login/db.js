'use strict'

const express = require('express');
const app = express();
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
        response.send(render('register', `<div class='error-box'>Error!!! ${valid.error}</div>`));
    }

};
exports.index = function(request, response) {
    if(request.session.user) {
        response.send(render("home"));
    } else {
        response.send(render('ind'));
    }
}
exports.done = function(request, response) {
    response.redirect("/done.html");
}
exports.register = function(request, response) {
    response.send(render('register'));
}
exports.home = function(request, response) {
    if(request.session.user) {
        console.log(request.session.user);
        response.send(render("home", `Ваш статус пользователя: ${request.session.user.status}</br>`));
    } else {
        response.redirect('/login/');
    }

}
exports.login = async function(request, response) {
    console.log(request.method);
    if(request.method === 'GET') {
        if(request.session.user) {
            response.redirect('/user/home/');
        } else {
            response.send(render('login'));
        }

    } else {
        let sess = request.session;
        // console.log(request);
        if(sess.user) {
            // response.redirect('/user/home');
            response.redirect('/user/home/');
        } else {
            //console.log('go' + request.body.login + " " + await crypt.hash(request.body.password, 8));
            let user = new User();
            let result = await user.getList({
                login: request.body.login
                //password: await crypt.hash(request.body.password, 8),
            });
            console.log(result);
            if(result.length > 0 && await crypt.compare(request.body.password, result[0].password)) {
                sess.user = result[0];
                console.log("----" + result[0]);
                // response.send('home');
                response.redirect('/user/home/');
            } else {
                response.send(render('login', '<div class="error-box">Error!! Password and login not valid</div>'));
            }
        }
    }
}
exports.logout = async function(request, response) {

    request.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        response.redirect('/login');
    });

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
function render(file, insert = false) {
    try {
        const data = fs.readFileSync(__dirname + `/public/${file}.html`, 'utf-8');
        return (data && insert) ? data.replace("#TEXT#", insert) : data.replace("#TEXT#", '');
    } catch (err) {
        console.error(err);
    }
    return false;

}