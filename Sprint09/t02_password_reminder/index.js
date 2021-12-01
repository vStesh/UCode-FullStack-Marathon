'use strict'

const express = require('express');
const db = require('./db');
const app = express();
const userRouter = express.Router();
const session = require('express-session');


app.use(session({secret: 'hsjhjgkdfjgksj', saveUninitialized: true, resave: true, user: {}}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', express.static(__dirname + '/public'));

userRouter.post("/create", db.addUser);
userRouter.post("/validate", db.addUser);
userRouter.use("/home", db.home);
app.use("/user", userRouter);
app.use("/done", db.done);
app.get("/logout", db.logout);
app.get("/register", db.register);
app.use("/reminder", db.reminder);
app.use("/login", db.login);
app.use("/", db.index);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(3000, "localhost",function(){
    console.log("Open http://127.0.0.1:3000/ \n Click Ctrl+C for stop server");
});


