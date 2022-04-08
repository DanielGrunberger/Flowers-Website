const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/flowers-website');

mongoose.connection.once('open', function(){
    console.log('Connected to db');
}).on('error', function(error){
    console.log("Error connecting to db: ", error)
});