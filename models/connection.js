const mongoose = require('mongoose');
require("dotenv").config();

const BDD_LOGIN = process.env.BDD_LOGIN;
const BDD_PASSWORD = process.env.BDD_PASSWORD;

const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
};

mongoose.connect(`mongodb+srv://${BDD_LOGIN}:${BDD_PASSWORD}@cluster0.nowh4.mongodb.net/nafs`, options, function(err) { console.log(err);
    }
);

module.exports = mongoose;