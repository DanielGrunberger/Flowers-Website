const path = require('path');
var db = require('./database.json')

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
        let result = db.filter(obj => {
            return obj.username === username && obj.password == password
        })
        if (result.length != 1) {
            return false
        }
        return true
}


app.get('/',function(req,res){
    currentUser = req.query.name;
    console.log(currentUser)
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
        res.sendFile('index.html');
    }
    else {
        console.log("Non-authenticated")
    }
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
