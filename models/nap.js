const mongoose = require('mongoose');

const napSchema = mongoose.Schema({
    version: String,
    ref: String,
    intitule: String
});

const napModel = mongoose.model('naps', napSchema);

module.exports = napModel;