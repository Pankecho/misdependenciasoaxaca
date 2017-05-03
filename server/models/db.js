const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/misdependencias');

const db = mongoose.connection;
//db.on('connect',console.log('Conexion establecida'));
db.on('error', console.error.bind(console, 'Connection error'));

module.exports = db;