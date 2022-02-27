const mongoose = require('mongoose');

const naf1993Schema = mongoose.Schema({
    version: String,
    ref: String,
    intitule: String
});

const naf1993Model = mongoose.model('naf1993', naf1993Schema);

module.exports = naf1993Model;