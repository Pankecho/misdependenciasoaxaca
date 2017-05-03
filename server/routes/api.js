'use strict';
const express = require("express");
const router = express.Router();
const Dependencia = require('../models/dependencia'),
    Comentario = require('../models/comentario'),
    Sucursal = require('../models/sucursal'),
    Tramite = require('../models/tramite'),
    Categoria = require('../models/categoria');


router.get("/categorias", (req, res, next) => {
    Categoria.findAll({sort:'id'})
    .then((d)=>{
        if(d){
            res.status(200)
            .json({categorias:d})
        }else{
            res.status(200)
            .json({message:"No hay datos a mostrar"});
        }
    });
}).
get('/busqueda/:filtro',(req,res,next)=>{
    const filtro=req.params.filtro;
    Tramite.findAll({
        where:{
            $or: [{'nombre': {$iLike: `%${filtro}`}}, 
                    {'descripcion':{$iLike: `%${filtro}`}}]
        }
    }).then((data)=>{
        console.log(data);
    });
})
//{idtramit,nombre,dependencia,categoria}

;



module.exports = router;