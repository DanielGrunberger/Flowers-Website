const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
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
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    created_at: Date,
    updated_at: Date
}, {timestamps: true});


schema.statics.add = async function(user) {
    const existUsername = await this.findOne({ username: user.username});
    if (!existUsername) {
        return this.create(user);
    }
};

schema.statics.getAll = async function() {
    return this.find();
};

schema.statics.getByUsername = async function(username) {
    return this.findOne({
        username: username
    });
};

schema.statics.getWorkers = async function() {
    return this.find({
      position: 'Worker'
    });
};


schema.statics.checkCredentials = async function(username, password) {
    return this.findOne({
        username: username,
        password: password
    });
};

schema.statics.edit = async function(user) {
    return this.updateOne( {username: user.username}, user);
};


schema.statics.delete = async function(user) {
    return this.deleteOne({
        username: user.username
    });
};

schema.pre('save', function(next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});



module.exports = mongoose.model('users', schema);



