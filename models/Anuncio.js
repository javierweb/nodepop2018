'use strict';

const mongoose = require('mongoose');

//Definimos un esquema
const anuncioSchema = mongoose.Schema ({
    name: {type: String, index: true },
    venta: {type: Boolean},
    precio: {type:Number},
    foto: {type:String},
    tags: {type: String}

});

//creamos un metodo estatico del modelo
anuncioSchema.statics.listar = function(filtro, skip, limit, sort, fields, callback) {
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec(callback);
};

//creamos el modelo

const Anuncio = mongoose.model ('Anuncio', anuncioSchema);

module.exports = Anuncio;