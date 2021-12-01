const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();

app.use(session({ secret: "dfsdfsdf", saveUninitialized: true, resave: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let sess;
app.get("/", (request, response) => {
  sess = request.session;
    if (sess.password) {
        response.send(render(2, sess.hash));
    } else if(!sess.password){
        response.send(render(1, '', sess.hacked));
    }
});

app.post('/', (request,response) => {
    sess = request.session;
    console.log(sess);
    sess.password = request.body.password;
    sess.number = request.body.number;
    console.log(sess.number);
    sess.hash = bcrypt.hashSync(sess.password, +sess.number);
    response.redirect('/admin');
});
app.get('/admin', (request, response) => {
    sess = request.session
    if(sess.password){
        response.send(render(2, sess.hash))
    }
})
app.get('/logout', (request, response) => {
    request.session.destroy(err => {
        if(err){
            return console.log(err)
        }
    })
    response.redirect('/')
})


app.post('/check', (request,response) => {
    sess = request.session;
    sess.text = request.body.text
    if(sess.password) {
            if(bcrypt.compareSync(sess.text, sess.hash)){
            sess.hacked = true;
            request.session.destroy((err) => {
                if(err) {
                    return console.log(err);
                }
                response.send(render(3));
            });
        } else {
            response.send(render(4, sess.hash));
        }
    } else {
        response.redirect('/');
    }
})

app.listen(3000,"127.0.0.1",function(){
    console.log("Open http://127.0.0.1:3000/ \n Click Ctrl+C for stop server");
});



function  render(type, hash = '') {
    let result1 = `<h1>Password</h1>
    <form action="/" method="POST" >
    <p>Password not saved at session.</p>
    <p>Password for saving to session<input type="password" name="password" placeholder="Password to session"></p>
    <p>Salt for saving to session<input type="number" name="number" placeholder="Salt to session"></p>
    <button type="submit">Save</button>
    </form>
    `;
    let result2 = `<h1>Password</h1>
    <form action="/check" method="POST" >
    <p>Password saved at session.</p>
    <p>Hash is ${hash}</p>
    <p>Try to guess:<input type="text" name="text" placeholder="Password to session"><button type="submit">Check password</button></p>
    </form>
    <button onclick="location.href='/logout'">Clear</button>
    `;
    let result3 = `<h1>Password</h1>
    <h2 style="color:green">Hacked!</h2>
    <form action="/" method="POST" >
    <p>Password not saved at session.</p>
    <p>Password for saving to session<input type="password" name="password" placeholder="Password to session"></p>
    <p>Salt for saving to session<input type="number" name="number" placeholder="Salt to session"></p>
    <button type="submit">Save</button>
    </form>
    `;
    let result4 = `<h1>Password</h1>
    <h2 style="color:red">Access denied!</h2>
    <form action="/check" method="POST" >
    <p>Password saved at session.</p>
    <p>Hash is ${hash}</p>
    <p>Try to guess:<input type="text" name="text" placeholder="Password to session"><button type="submit">Check password</button></p>
    </form>
    <button onclick="location.href='/logout'">Clear</button>
    `;
    if(type == 1){
        return result1;
    }
    if(type == 2){
        return result2;
    }
    if(type == 3){
          return result3
      }
    if(type == 4){
        return result4
    }
}
