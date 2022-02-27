const mongoose = require('mongoose');

const nafrev1Schema = mongoose.Schema({
    version: String,
    ref: String,
    intitule: String
});

const nafrev1Model = mongoose.model('nafrev1', nafrev1Schema);

module.exports = nafrev1Model;