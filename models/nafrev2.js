const mongoose = require('mongoose');

const nafrev2Schema = mongoose.Schema({
    version: String,
    ref: String,
    intitule: String
});

const nafrev2Model = mongoose.model('nafrev2', nafrev2Schema);

module.exports = nafrev2Model;