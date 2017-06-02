const mongoose = require('mongoose');
const TestSchema = require('../shchemas/test');

let Test = mongoose.model('Test', TestSchema);

module.exports = Test;