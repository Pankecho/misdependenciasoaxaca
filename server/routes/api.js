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
    }).catch(e=>{        
        res.status(500).json({message:"Error en el servidor"});        
    });
})
.get("/dependencia/:id",(req,res,next)=>{
    const id=req.params.id;
    Dependencia.findById(id)
    .then(d=>{
        if(d){
        Sucursal.findAll({where:{'id_dependencia':d.id},
            attributes:["id","nombre"]}).then(sucs=>{
                Tramite.findAll({where:{'id_dependencia':d.id},
                            attributes:['id','nombre','descripcion']
                    }).then(trams=>{
                        let data={'nombre':d.nombre,'id':d.id,
                                'sucursales':sucs,
                                'tramites':trams};
                         res.status(200).json({data:data});   
                    });
        });}else{
            res.status(200)
            .json({message:"No hay datos a mostrar"});
        }
    }).catch(e=>{
        
         res.status(500).json({message:"Error en el servidor"});        
    })
})
.get("/categorias/:id",(req,res,next)=>{
    const id=req.params.id;
    Categoria.findById(id)
    .then((c)=>{
        if(c){
        Dependencia.findAll({where:{id_categoria:c.id}})
        .then((deps)=>{
            let data={id:c.id,nombre:c.nombre,
                        dependencias:deps}
            res.status(200)            
            .json({data:data});
        });}else{
             res.status(200).json({message:"No hay datos a mostrar"});
        }
    }) 
    .catch((e)=>{
        res.status(500).json({message:"Error en el servidor"});
        
    })   
})
.get("/tramite/:id",(req,res)=>{
    const id=req.params.id;
    Tramite.findById(id)
    .then((t)=>{
        if(t){
        const idDepend=t.id_dependencia;    
        Sucursal.findAll({where:{'id_dependencia':idDepend},
                        attributes:["id","nombre","telefono","direccion","latitud","longitud"]})
        .then((sucs)=>{
                let aux=t.requisitos.split(',');
                t.requisitos=aux;               
                Dependencia.findById(idDepend)
                .then((dep)=>{
                    let data={'id':t.id,
                                'nombre':t.nombre,
                                'requisitos':t.requisitos,
                                'descripcion':t.descripcion,
                                'dependencia':{
                                    'id':dep.id,
                                    'nombre':dep.nombre,
                                    'sucursales':sucs
                                }};                    
                    res.status(200).json({data:data}); 
                });               
        });}
        else{
             res.status(200).json({message:"No hay datos a mostrar"})
        }
    })
    .catch((e)=>{
        res.status(500).json({message:"Error en el servidor"});        
    }) ;
})
.get('/busqueda/:filtro',(req,res,next)=>{
    const filtro=req.params.filtro;    
    db.query(`SELECT t.id, 
                    t.nombre,
                    d.nombre as dependencia,
                    d.id_categoria,
                    c.nombre as categoria 
                    FROM tramite as t inner join dependencia as d ON t.id_dependencia=d.id
                        inner join  categoria as c ON c.id=d.id_categoria 
                    WHERE t.nombre like '%${filtro}%' or t.descripcion like '%${filtro}%';`)
    .then((d)=>{
        if(d[0].length>0)        
            res.status(200).json({data:d[0]});
        else
            res.status(200).json({message:"No hay datos disponibles"});
    })
    .catch((e)=>{        
        res.status(500).json({message:"Error en el servidor"});        
    });  
});



module.exports = router;