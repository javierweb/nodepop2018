'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;


db.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

db.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});


mongoose.connect('mongodb://localhost/nodepop');

module.exports = db;
