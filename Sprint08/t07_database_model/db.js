'use strict'

const express = require('express');
const app = express();

const Hero = require('./models/hero');

app.get('/', function(request, response){

    response.send(getIndex());
});
app.get('/find', async function(request, response){
    let hero = new Hero();
    response.json(await hero.find(1));
});

app.get('/save', async function(request, response){
    let hero = new Hero();
    response.json(await hero.save({id: 18, name: 'qqqqq', description: "ddddd", race: "Human", class_role: 2}));
});

app.get('/delete', async function(request, response){
    let hero = new Hero();
    response.json((await hero.find(12)).delete());
});

app.get('/all', async function(request, response){
    let hero = new Hero();
    response.json((await hero.getAll()).data);
});
app.listen(3000,"127.0.0.1",function(){
    console.log("Open http://127.0.0.1:3000/ \n Click Ctrl+C for stop server");
});


function getIndex() {
    let result = '';
    result += `
    <a href="/find">find(id)</a>
    <a href="/delete">delete()</a>
    <a href="/save">save()</a>
    <a href="/all">all()</a>
    `;

    return result;
}