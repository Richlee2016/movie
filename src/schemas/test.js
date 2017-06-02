const mongoose = require('mongoose');

let TestSchema = new mongoose.Schema({
    name: String,
    age: Number
});

module.exports = TestSchema;