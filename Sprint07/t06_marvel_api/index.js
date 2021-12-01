'use strict'

const express = require('express');
const app = express();
const fetch = require('node-fetch');
const crypto = require('crypto');


const pubKey = '5f6eadc3d11a86478ba472e302987974';
const privKey = 'c0321828bbf1f24884dc674795813ca36181dd39';

let ccc = '';

console.log(ccc);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/js', express.static(__dirname + '/'));

app.get('/', async function(request, response){
    response.sendFile(__dirname + '/register.html');
});

app.get('/show', async function(request, response){
    response.json(await getMarvel());
});

app.listen(3000,"127.0.0.1",function(){
    console.log("Open http://127.0.0.1:3000/ \n Click Ctrl+C for stop server");
});

async function getMarvel() {
    let now = Date.now();
    ccc = crypto.createHash('md5').update(now + privKey + pubKey).digest("hex");
    return fetch(`http://gateway.marvel.com/v1/public/comics?apikey=${pubKey}&hash=${ccc}&ts=` + now)
        .then(res => res.json());
}