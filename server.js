const path = require('path');
var usersDb = require('./public/users.json')
var flowersDb = require('./flowers.json')
const fs = require('fs')

var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var LoggedIn  = false;
var workerPosition = "Worker";
var managerPosition = "Manager";

function getUserRole(username) {
    let result = usersDb.filter(obj => {
        return obj.username === username 
    })
    if (result.length != 1) {
        return ""
    }
    return result[0].position
}

function addUser(my_firstname, my_lastname, my_user, position, password) {
    newUser = {
        firstname: my_firstname,
        lastname: my_lastname,
        user: my_user,
        position: position,
        password: password,
        status: "active",
    };
    usersDb.push(newUser);
    fs.writeFileSync("./public/users.json", JSON.stringify(usersDb));
}
/*function deleteUser(my_firstname, my_lastname, my_user, position, password) {
    let result = usersDb.filter(obj => {
        return  obj.user === my_user && obj.password == password && obj.firstname==my_firstname  && obj.my_lastname ==lastname})
        
    if (result) {
        result.status ="not_active";
    }
}/*/

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
app.get('/users-management',function(req,res){
    currentUser = req.query.name;
    role = getUserRole(currentUser);
    if (role == workerPosition){
        res.sendFile(__dirname + '/public/users-management-worker.html')
        return;
     } else if (role == managerPosition) {
        res.sendFile(__dirname + '/public/users-management-manager.html')
        return;
    }
});
app.get('/options',function(req,res){
    currentUser = req.query.name;
    role = getUserRole(currentUser);
    if(role == workerPosition || role == managerPosition) {
     res.sendFile(__dirname + '/public/authenticated-options.html');
     return;
    }

    res.sendFile(__dirname + '/public/unauthenticated-options.html');
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
});

app.post('/add-user',  function(req, res) {
    postData = req.body;
    my_firstname = postData.firstName;
    my_lastname = postData.lastName;
    my_user = postData.username;
    position = postData.position;
    password = postData.password;
    action = postData.action;
    /*/if (action=="Delete"){
        setTimeout(() => {
            deleteUser(my_firstname, my_lastname, my_user, position, password)
        }, 5000);
        res.sendStatus(200);
    }/*/
   if(action=="Add"){
    setTimeout(() => {
        addUser(my_firstname, my_lastname, my_user, position, password)
    }, 5000);
    res.sendStatus(200);
    }
   
});


app.listen(8080, ()=>{console.log('listening in 8080...');});
