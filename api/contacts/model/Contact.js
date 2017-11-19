'use strcits';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    website: {type: String, required: true}
});

module.exports = mongoose.model('Contact', ContactSchema);