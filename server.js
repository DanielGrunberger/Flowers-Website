const path = require('path');
var usersDb = require('./users.json')
var flowersDb = require('./flowers.json')

var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var bodyParser = require('body-parser');
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var LoggedIn  = false;

function checkCreds(username, password) {
        let result = usersDb.filter(obj => {
            return obj.username === username && obj.password == password
        })
        if (result.length != 1) {
            return false
        }
        return true
}


app.get('/',function(req,res){
    currentUser = req.query.name;
    if (currentUser != "") {
        console.log('logged in');
    }
    else {
        console.log("Non-authenticated")
    }
    res.sendFile('index.html');
});

app.get('/home',function(req,res){
    currentUser = req.query.name;
    if (currentUser != "") {
        res.sendFile(__dirname + '/public/index.html');
    }
    else {
        console.log("Non-authenticated")
    }
});

app.get('/catalog',function(req,res){
    res.sendFile(__dirname + '/public/catalog.html');
});

app.get('/contact',function(req,res){
    res.sendFile(__dirname + '/public/contact.html');
});

app.get('/about',function(req,res){
    res.sendFile(__dirname + '/public/about.html');
});


app.post('/login',  function(req, res) {
    var postData = req.body;
    if (checkCreds(postData.username, postData.password)) {
        LoggedIn = true;
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }
})


app.listen(8080, ()=>{console.log('listening in 8080...');});
