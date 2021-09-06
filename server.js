//required installs
const fs = require('fs');
const path = require('path');
//https://www.npmjs.com/package/uuid allows you to create id for each note
const uuid = require('uuid');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/routes');
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); //https://expressjs.com/en/starter/static-files.html

app.use('/api', apiRoutes)

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