// ENV VARIABLES
require('dotenv').config();

// APP DEPENDENCIES
const bodyParser = require('body-parser');
// Consume the API from different origin
const cors = require('cors'); 
const console = require('console');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({'extended': true}));
app.use(cors());

// Routes
const contactRoutes = require('./api/contacts/routes/contacts.routes');

app.use('/api/contacts', contactRoutes);

const hostname = process.env.SERVER_HOSTNAME;
const port = process.env.SERVER_PORT;

// DB CONNECTION
mongoose.connect(process.env.MONGO_DB_URL, { useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB connected");
    
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`)
    });
});