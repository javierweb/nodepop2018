'use strict';

const express = require('express');
const router = express.Router ();
const mongoose = require('mongoose');

const Anuncio = require ('../../models/Anuncio');

/**
 * @api {get} /anuncios Request list of ads
 * 
 * @apiSuccess {String} firtname Firtname of the user
 * @apiSucces {String} lastname Lastname of the user
 * 
 */

 router.get ('/', async (req, res, next) => {
     try {
         //recogemos parametros de la entrada
         const name = req.query.name;
         const venta = req.query.venta;
         const precio = req.query.precio;
         const tags = req.query.tags;
         const skip = parseInt(req.query.skip);
         const limit = parseInt(req.query.limit);
         const sort = req.query.sort;
         const fields = req.query.fields;

         console.log(req.query)

         const filtro = {};
            
            if (typeof req.query.name !== 'undefined') {
                 filter.name = new RegExp('^' + req.query.name, 'i');
            }

            if (typeof req.query.precio !== 'undefined' && req.query.precio !== '-'){
                if (req.query.precio.indeOf('-') !== -1) {
                    filter.precio = {};
                    let rango = req.query.precio.split('-');
                    if (rango[0] !== '') {
                        filters.precio.$gte = rango[0];
                    }
                    
                    if (rango[1] !== '') {
                        filters.precio.$lte = rango[1];
                    }
                } else {
                    filters.precio = req.query.precio;
                }
            }

            if (typeof tags !=='undefined') {
                filtro.tags = tags;
            }    

            const docs = await Anuncio.listar(filtro, skip, limit, sort, fields);
            res.json({ success: true, result: docs});
     }catch (err) {
         next(err);
         return;
     }
 });


 //POST
 router.post('/', (req, res, next) => {
     console.log (req.body);
     
     const data = req.body;

     //creamos documento de anuncio en memoria
    const anuncio = new Anuncio (data);

    //lo persistimos en la base de datos
    anuncio.save((err, anuncioGuardado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, result: anuncioGuardad });
    });
 });


 //DELETE
 router.delete('/:id', async(req, res, next) => {
     try {
         const _id = req.params.id;
         await Anuncio.remove({_id: _id}).exec();
         res.json({ success: true });
     }  catch(err) {
         next(err);
         return;
     }
 });

 //PUT
 router.put ('/:id', async( req, res, next) => {
     try {
         const _id = req.params.id;
         const data = req.body;

         const anuncioActualizado = await Anuncio.findByIdAndUpdate(_id, data, {
             new: true
         });
         res.json({ success: true, result: anuncioActualizado });         
     }catch(err){
     next(err);
     return;
     }
 });

 module.exports = router;