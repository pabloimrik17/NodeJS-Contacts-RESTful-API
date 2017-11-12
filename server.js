

const bodyParser = require('body-parser');
// Consume the API from different origin
const cors = require('cors'); 
const console = require('console');

const contacts = require('./data');

const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({'extended': true}));
app.use(cors());

app.get('/api/contacts', (req, res) => {

    if (!contacts) {

        res.status(404).json({'message': 'No contacts found'});

    }

    res.json(contacts);

});

app.get('/api/contacts/:id', (req, res) => {

    const reqId = req.params.id;

    const resContact = contacts.filter((contact) => contact.id == reqId);
    
    if (!resContact) {

        res.status(404).json({'message': 'No contacts found'});

    }

    res.json(resContact);

});

const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}`)

})