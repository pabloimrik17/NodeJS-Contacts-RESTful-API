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

app.post('/api/contacts', (req, res) => {

    const contact = {
        'email': req.body.email,
        'first_name': req.body.first_name,
        'id': contacts.length + 1,
        'last_name': req.body.last_name,
        'website': req.body.website
    }

    contacts.push(contact);

    res.json(contact);

});

app.put('/api/contacts/:id', (req, res) => {

    const reqId = req.params.id;
    const contact = contacts.filter((contact) => contact.id == reqId)[0];

    const index = contacts.indexOf(contact);

    // OBTENEMOS TODOS LOS ELEMENTOS DEL BODY
    const keys = Object.keys(req.body); 

    keys.forEach((key) => {

        if (contact[key]) {

            contact[key] = req.body[key];

        }

    });

    contacts[index] = contact;

    res.json(contacts[index]);
    
});

app.delete('/api/contacts/:id', (req, res) => {
    
    const reqId = req.params.id;

    const contact = contacts.filter((contact) => contact.id == reqId)[0];
    
    const index = contacts.indexOf(contact);

    contacts.splice(index, 1);

    res.json({'message': `UserId: ${reqId} deleted`});

});

const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {

    mongoose.connect(process.env.MONGO_DB_URL, { useMongoClient: true });
    mongoose.Promise = global.Promise;
    console.log(mongoose.model('Contacts').find());

    console.log(`Server running at http://${hostname}:${port}`)

})