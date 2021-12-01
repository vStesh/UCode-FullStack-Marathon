'use strict'

const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const multer  = require("multer");
const session = require('express-session');
let csvArray = [];
let sess;

app.use(session({secret: 'hsjhjgkdfjgksj', saveUninitialized: true, resave: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(__dirname + '/'));
app.use('/js', express.static(__dirname + '/'));
app.use(multer({dest:"uploads"}).single("file"));

app.get('/', function(request, response){
    response.send(getIndex());
});

app.post('/', function(request, response, next){
    sess = request.session;
    sess.file = request.file.path;
    csvArray = [];
    let result = '';
    fs.createReadStream(sess.file)
        .pipe(csv())
        .on('data', (data) => csvArray.push(data))
        .on('end', () => {
            result = renderTable(csvArray);
            response.send(getIndex(result));
        });
});

app.get('/filter', function(request, response){
    csvArray = [];
    let result = '';
    fs.createReadStream(sess.file)
        .pipe(csv())
        .on('data', (data) => csvArray.push(data))
        .on('end', () => {
            result = renderTable(csvArray, request.query);
            response.send(getIndex(result));
        });
});

app.listen(3000,"127.0.0.1",function(){
    console.log("Open http://127.0.0.1:3000/ \n Click Ctrl+C for stop server");
});

function getIndex(insert = false) {
    try {
        const data = fs.readFileSync('register.html', 'utf-8');
        return (data && insert) ? data.replace("#TEXT#", insert) : data.replace("#TEXT#", ' ');
    } catch (err) {
        console.error(err)
    }
    return false;

}

function renderTable(arr, filter = false) {
    let map = getFilters(arr);
    let result = '<form action="/filter" method="get" id="filters"><table border="1px;"><tr>';
    for(let key in arr[0]){
        result += `<th>${getFilterHtml(key, map, filter ? filter[key] : false)}</th>`;
    }
    result += '</tr>';
    if(filter && Object.keys(filter).length !== 0) {
        arr = arr.filter(item => {
            let flag = true;
            for(let key in item){
                if(!(filter[key] === item[key] || filter[key] === 'all-items')) {
                    flag = false;
                }
            }
            return flag;
        });
    }
    arr.map(item => {
        result += '<tr>';
        for(let key in item){
            result += `<td>${item[key]}</td>`;
        }
        result += '</tr>';
    });
    result += '</table><button type="submit" id="submit"></button></form>';
    return result;
}

function getFilterHtml(title, map, filter) {
    let result = `<select name="${title}">${title}`;
    result += `<option value="all-items" ${!filter || filter === 'all-items' ? 'selected' : ''}><b>${title} (all)</b></option>`;
    map.get(title).map(item => {
        result += `<option value="${item}" ${filter === item ? 'selected' : ''}>${item}</option>`;
    });
    result += '</select>';
    return result;
}

function getFilters(arr) {
    let map = new Map();
    for(let key in arr[0]){
        map.set(key, [...new Set(arr.map(item => {return item[key]}))].sort());
    }
    return map;
}