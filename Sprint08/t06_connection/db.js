let mysql      = require('mysql2');
let db = require('./config.json');
const express = require('express');
const app = express();

let connection = mysql.createConnection({
    host     : db.host,
    user     : db.user,
    password : db.password,
    database : db.data_base
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('Подключение к БД установлено: ', results);
});

app.listen(3000,"127.0.0.1",function(){
    console.log("Open http://127.0.0.1:3000/ \n Click Ctrl+C for stop server");
});


connection.end();