'use strict';
const express = require("express"),
        Sequelize=require("sequelize"),
        db=require('../models/db').database;
const router = express.Router();
const Dependencia = require('../models/dependencia'),
    Comentario = require('../models/comentario'),
    Sucursal = require('../models/sucursal'),
    Tramite = require('../models/tramite'),
    Categoria = require('../models/categoria');


router.get("/categoria", (req, res, next) => {
    Categoria.findAll({sort: 'id'})
    .then((d) => {
        if(d){
            res.status(200).json(d);
        }else{
            res.sendStatus(200);
        }
    })
    .catch(e => {        
        res.sendStatus(500);        
    });
})

.get("/tramite",(req,res,next) =>{
    Tramite.findAll({sort: 'id'})
    .then((d)=>{
        if(d){
            res.status(200).json(d);
        }else{
            res.sendStatus(200);
        }
    })
    .catch(e => {
        res.sendStatus(500);
    });
})

.get("/dependencia/:id",(req,res,next) => {
    const id = req.params.id;
    Dependencia.findById(id)
    .then(d => {
        if(d){
            Sucursal.findAll({where: {'id_dependencia': d.id},
                            attributes: ["id", "nombre"]})
                    .then(sucs => {
                    Tramite.findAll({where: {'id_dependencia': d.id},
                                    attributes:['id', 'nombre', 'descripcion']})
                            .then(trams => {
                                let data = {'nombre': d.nombre,
                                            'id': d.id,
                                            'sucursales': sucs,
                                            'tramites': trams
                                        };
                                 res.status(200).json(data);   
                            });
            });
        }else{
            res.sendStatus(404);
        }
    }).catch(e => {
         res.sendStatus(500);        
    })
})

.get("/categoria/:id", (req,res,next) => {
    const id = req.params.id;
    Categoria.findById(id)
        .then((c) => {
            if(c){
                Dependencia.findAll({where: {id_categoria: c.id}})
                    .then((deps) => {
                        let data = {id: c.id,
                                    nombre: c.nombre,
                                    dependencias: deps
                                };
                        res.status(200).json(data);
                    });
            }else{
                res.sendStatus(200);
            }
        }) 
        .catch((e) => {
            res.sendStatus(500);        
        });   
})

.get('/categoria/:id/tramite',(req,res) => {
    const id = req.params.id;
    Categoria.findById(id)
        .then((c) => {
            if(c){
                let query=`select t.id, t.nombre, t.descripcion FROM tramite as t inner join dependencia as d on t.id_dependencia = d.id
                            where d.id_categoria = ${id}`;
                db.query(query)
                    .then(d => {
                        if(d[0].length > 0){
                            res.status(200).json(d[0]);
                        }else{
                            res.sendStatus(200);
                        }
                   })
                   .catch(e => {
                       res.sendStatus(500);
                   });     
            }else{
                 res.sendStatus(404);
            }
        }) 
        .catch((e)=>{
            res.sendStatus(500);        
        });
})

.get("/tramite/:id",(req,res) => {
    const id = req.params.id;
    Tramite.findById(id)
        .then((t) => {
            if(t){
                const idDepend = t.id_dependencia;    
                Sucursal.findAll({where:{'id_dependencia':idDepend},
                                    attributes:["id","nombre","telefono","direccion","latitud","longitud"]})
                .then((sucs) => {
                        let aux = t.requisitos.split(',');
                        t.requisitos = aux;               
                        Dependencia.findById(idDepend)
                            .then((dep) => {
                                let data = {'id': t.id,
                                            'nombre': t.nombre,
                                            'requisitos': t.requisitos,
                                            'descripcion': t.descripcion,
                                            'dependencia': {
                                                'id': dep.id,
                                                'nombre': dep.nombre,
                                                'sucursales': sucs
                                            }};                    
                                res.status(200).json(data); 
                            });               
                });
            }
            else{
                res.sendStatus(404);
            }
        })
        .catch((e) => {
            res.sendStatus(500);        
        });
})

.get('/busqueda/:filtro',(req,res,next) => {
    const filtro = req.params.filtro;    
    db.query(`SELECT t.id, 
                    t.nombre,
                    d.nombre as dependencia                                       
                    FROM tramite as t inner join dependencia as d ON t.id_dependencia=d.id  
                    WHERE t.nombre ilike '%${filtro}%' or t.descripcion ilike '%${filtro}%';`)
    .then((d) => {
        if(d[0].length > 0)        
            res.status(200).json(d[0]);
        else
            res.sendStatus(404);
    })
    .catch((e) => {        
        res.sendStatus(500);        
    });  
})

.get('/sucursal/:id',(req,res,next) => {
    const id = req.params.id;
    Sucursal.findById(id)
        .then(suc => {
            if(suc){
                Comentario.findAll({where: {id_sucursal: suc.id},
                                    attributes: ['id','descripcion','fecha']})
                .then(comments => {
                    let data={'id': suc.id,
                            'nombre': suc.nombre,
                            'telefono': suc.telefono,
                            'direccion': suc.direccion,
                            'latitud': suc.latitud,
                            'longitud': suc.longitud,
                            'comentarios': comments};
                      res.status(200).json(data);      
                    });
            }else{
                res.sendStatus(404);
            }
        })
        .catch(e => {
            res.sendStatus(500);
        })
})

.post('/sucursal/:id/comentario',(req,res,next) => {
    const comentario={'descripcion': req.body.descripcion,
                        'fecha': new Date(),
                        'id_sucursal': req.params.id};
    Comentario.create(comentario)
        .then(c => {        
            res.sendStatus(201);        
        })
        .catch(e => {
            res.sendStatus(500);
        });                      
});



module.exports = router;