const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose'); 

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    email :{
        type: String
    },
    created_at: Date,
    updated_at: Date
}, {timestamps: true});


// UserSchema.statics.add = async function(user) {
//     const existUsername = await this.findOne({ username: user.username});
//     if (!existUsername) {
//         return this.create(user);
//     }
// };

UserSchema.statics.getAll = async function() {
    return this.find();
};

UserSchema.statics.getByUsername = async function(username) {
    return this.findOne({
        username: username
    });
};

UserSchema.statics.getWorkers = async function() {
    return this.find({
      position: 'Worker'
    });
};


UserSchema.statics.update = async function(user) {
    return this.updateOne( {username: user.username}, user);
};


UserSchema.statics.delete = async function(user) {
    return this.deleteOne({
        username: user.username
    });
};

UserSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', UserSchema);



