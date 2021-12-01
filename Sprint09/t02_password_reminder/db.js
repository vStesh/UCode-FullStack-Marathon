'use strict'

const express = require('express');
const app = express();
const mysql = require('mysql2');
const User = require('./models/user');
const _conf = require('./config.json');
const fs = require('fs');
const crypt = require('bcryptjs');
const nodemailer = require("nodemailer");


exports.addUser = async function (request, response){
    let valid = await validate(request.body);
    console.log("valid--- " + valid.status);
    if(valid.status) {
        let user = new User();
        console.log(request.body);
        user.save({
            full_name: request.body.name,
            login: request.body.login,
           // password: await crypt.hash(request.body.password, 8),
            password: request.body.password,
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
exports.reminder = async function(request, response) {
    if(request.method === 'GET') {
        response.send(render('reminder'));
    } else {
        let user = new User();
        let result = await user.getList({
            email: request.body.email
        });
        let message = "";
        if(result.length > 0) {
            sendEmail(result[0].email, result[0].password);
            message = "<div class='success-box'>Ваш пароль отправлен на Ваш email</div>";
        } else {
            message = "<div class='error-box'>Пользователя с таким email не существует!</div>";
        }
        response.send(render(
            'reminder',
            {text: message})
        );
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
            //if(result.length > 0 && await crypt.compare(request.body.password, result[0].password)) {
            if(result.length > 0 && request.body.password === result[0].password) {
                sess.user = result[0];
                console.log("----" + result[0]);
                // response.send('home');
                response.redirect('/user/home/');
            } else {
                response.send(render('login', {text: '<div class="error-box">Error!! Password and login not valid</div>'}));
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

function render(file, insert = {}) {
    try {
        let data = fs.readFileSync(__dirname + `/${_conf.view}/${file}.html`, 'utf-8');
        for(let key in insert) {
            data = data.replaceAll(`{#${key.toUpperCase()}#}`, insert[key]);
        }
        while (data.indexOf("{#") > 0) {
            data = data.replaceAll(data.slice(data.indexOf("{#"), data.indexOf("#}") + 2), "");
        }
        return data;
    } catch (err) {
        console.error(err);
    }
    return false;
}

async function sendEmail(email, pass) {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Sprint09 - V.Steshenko 👻" <vsteshenko@student.ucode.world>', // sender address
        to: email, // list of receivers
        subject: "Important! Password reminder.", // Subject line
        text: "Your password is: <b>" + pass + "</b>", // plain text body
        html: "Your password is: <b>" + pass + "</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}