const router = require('express').Router();
const fs = require('fs');
const path = require('path');
//https://www.npmjs.com/package/uuid allows you to create id for each note
const uuid = require('uuid');
const express = require('express');
const notes = require('../db/db.json');


router.get('/notes', (req, res) => {
    //res.json(notes);
    res.sendFile(path.join(__dirname, "../db/db.json")); //http://expressjs.com/en/api.html#res.sendFile
})

//adds new note over to db array, and gives it a unique id
router.post('/notes', (req, res) => {
    //console.log(req.body);
    const notes = JSON.parse(fs.readFileSync('./db/db.json'))
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    //has to have the './db/db.json' not the global const at the top
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes);
})

//http://expressjs.com/en/api.html#app.delete.method
//delete notes by id
router.delete('/notes/:id', (req, res) => {
    //https://stackoverflow.com/questions/65015000/how-do-i-use-express-js-app-delete-to-remove-a-specific-object-from-an-array
    //calling the db data like in app.post()
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const del = notes.filter((deleteNotes) => deleteNotes.id !== req.params.id);
    //taken from app.post()
    fs.writeFileSync('./db/db.json', JSON.stringify(del))
    res.json(del);
})

module.exports = router;