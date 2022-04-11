const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
schema.statics.getAll = async function() {
    result = await this.find();
    console.log(result[0].price);
    return this.find();
};
schema.statics.getByName = async function(flowerName) {
    return this.findOne({
        name: flowerName
    });
};

module.exports = mongoose.model('flowers', schema);



