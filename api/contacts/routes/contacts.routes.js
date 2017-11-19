'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../model/Contact');
const router = express.Router();

router.get('/', (req, res) => {
    
    Contact.find({}, (err, contacts) => {
        if(err) {
            res.status(400).json(err);
        } 

        res.json(contacts);
    });
})

router.get('/:id', (req, res) => {
    const reqId = req.params.id;

    Contact.find({id: reqId}, (err, contact) => {

        if (err) {
            res.status(400).json(err);
        } 

        res.json(contact);
    });
})

router.post('/', (req, res) => {
    const contact = new Contact(req.body);

    contact.save((err, contact) => {

        if (err) {
            res.status(400).json(err);
        } 

        res.json(contact);
    });
});

module.exports = router;