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
    const _id = req.params.id;

    Contact.findOne({_id}, (err, contact) => {
        if (err) {
            res.status(400).json(err);
        } 

        if (!contact) {
            res.status(404).json({message: 'Contact not found'});
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

router.put('/:id', (req, res) => {
    const _id = req.params.id

    // new: true gives back updated data
    Contact.findOneAndUpdate({_id}, req.body, {new: true}, (err, contact) => {
        if (err) {
            res.status(400).json(err);
        } 

        if (!contact) {
            res.status(404).json({message: 'Contact not found'});
        }

        res.json(contact);
    });            
});

router.delete('/:id', (req, res) => {
    const _id = req.params.id;

    Contact.findOneAndRemove({_id}, (err, contact) => {
        if (err) {
            res.status(400).json(err);
        }

        if (!contact) {
            res.status(404).json({message: 'Contact not found'});
        }

        res.json({message: `Contact ${contact._id} deleted`})
    });
})

module.exports = router;