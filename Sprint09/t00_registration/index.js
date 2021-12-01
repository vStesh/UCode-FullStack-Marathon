'use strict'

const express = require('express');
const db = require('./db');
const app = express();
const userRouter = express.Router();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public'));

userRouter.post("/create", db.addUser);
userRouter.post("/validate", db.addUser);
app.use("/user", userRouter);
app.use("/done", db.done);
app.use("/", db.index);


app.listen(3000, "localhost",function(){
    console.log("Open http://127.0.0.1:3000/ \n Click Ctrl+C for stop server");
});


