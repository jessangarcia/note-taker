const fs = require('fs')
const path = require('path')
const express = require('express');
const PORT = process.env.PORT || 3001
const app = express();
const { notes } = require('./db/db.json')
//const routes = require('./routes/index')

app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})