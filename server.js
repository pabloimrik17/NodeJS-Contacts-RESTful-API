// ENV VARIABLES
require('dotenv').config();

// APP DEPENDENCIES
const bodyParser = require('body-parser');
// Consume the API from different origin
const cors = require('cors'); 
const console = require('console');
const mongoose = require('mongoose');
const express = require('express');

// DATA
const contacts = require('./data');

const app = express();

app.use(bodyParser.urlencoded({'extended': true}));
app.use(cors());

// Routes
const contactRoutes = require('./api/contacts/routes/contacts.routes');

app.use('/api/contacts', contactRoutes);

const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {

    mongoose.connect(process.env.MONGO_DB_URL, { useMongoClient: true });
    mongoose.Promise = global.Promise;

    console.log(`Server running at http://${hostname}:${port}`)

})