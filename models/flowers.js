const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    created_at: Date,
    updated_at: Date
}, {timestamps: true});

schema.statics.add = async function(flower) {
    return this.create(flower);
};

module.exports = mongoose.model('flowers', schema);



