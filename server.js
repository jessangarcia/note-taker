//required installs
const fs = require('fs');
const path = require('path');
//https://www.npmjs.com/package/uuid allows you to create id for each note
const uuid = require('uuid');
const express = require('express');

const PORT = process.env.PORT || 3001
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
});

// //pulls notes by an id
// app.get('/api/notes/:id', (req, res) => {
//     res.json((notes[req.params.id]));
// });

app.post('/api/notes', (req, res) => {
    //console.log(req.body);
    const notes = JSON.parse(fs.readFileSync('./db/db.json'))
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes);
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})