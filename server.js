//required installs
const fs = require('fs');
const path = require('path');
//https://www.npmjs.com/package/uuid allows you to create id for each note
const uuid = require('uuid');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
//grabs info from db folder
const notes = require('./db/db.json')
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); //https://expressjs.com/en/starter/static-files.html


app.get('/api/notes', (req, res) => {
    //res.json(notes);
    res.sendFile(path.join(__dirname, "/db/db.json")); //http://expressjs.com/en/api.html#res.sendFile
})

//adds new note over to db array, and gives it a unique id
app.post('/api/notes', (req, res) => {
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
app.delete('/api/notes/:id', (req, res) => {
    //https://stackoverflow.com/questions/65015000/how-do-i-use-express-js-app-delete-to-remove-a-specific-object-from-an-array
    //calling the db data like in app.post()
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const del = notes.filter((deleteNotes) => deleteNotes.id !== req.params.id);
    //taken from app.post()
    fs.writeFileSync('./db/db.json', JSON.stringify(del))
    res.json(del);
})

//calls for index.html
//took from module 11
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//calls the notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//also from mod 11
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})