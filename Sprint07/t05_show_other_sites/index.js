'use strict'


const express = require('express');
const app = express();
const fs = require('fs');
const rq = require('request');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/', function(request, response){
    console.log(request.query);
    if(request.query.url) {
        rq(request.query.url.includes('http') ? request.query.url : 'http://' + request.query.url, function (error, res, body) {
            response.send(getIndex('<hr>url: ' + request.query.url + '</br><hr><pre>' +  body.substring(body.indexOf('<body'), body.indexOf('</body') + 7)
                .replaceAll('<','&lt;').replaceAll('>', '&gt;') + '</pre>'));
        });
    } else {
        response.send(getIndex(`<div id="typeurl">Type an URL...</div>`));
    }
});

app.listen(3000,"127.0.0.1",function(){
    console.log("Open http://127.0.0.1:3000/ \n Click Ctrl+C for stop server");
});

function getIndex(insert = false) {
    try {
        const data = fs.readFileSync('register.html', 'utf-8');
        return (data && insert) ? data.replace("#TEXT#", insert) : data.replace("#TEXT#", '');
    } catch (err) {
        console.error(err)
    }
    return false;
}
