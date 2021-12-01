'use strict'

const express = require('express');
const app = express();
const fs = require('fs'); // Файлы
const path = require('path'); // Пути
const File = require('./File');
const FileList = require('./FileList');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/', function(request, response){

   response.sendFile(__dirname + "/register.html");

});

app.post('/', function(request, response){
    let file = new File(request.body.filename);
    file.write(request.body.content)
    console.log(request.body);
    response.redirect('/');
});

app.get('/list', function(request, response){
    let fileList = new FileList();
    response.json({html: fileList.getHTMLList()});
});
app.get('/show', function(request, response){
    console.log(request.query.file);
    let file = new File(request.query.file);
    response.json({content: file.read()});
});
app.get('/delete', function(request, response){
    console.log(request.query.file);
    let file = new File(request.query.file);
    file.delete();
    response.redirect('/');
});
app.use('/js', express.static(__dirname + '/'));

app.listen(3000,"127.0.0.1",function(){
    console.log("Open http://127.0.0.1:3000/ \n Click Ctrl+C for stop server");
});

