const mongoose = require('mongoose'),
        Schema=mongoose.Schema;

const TramiteSchema=new Schema({
    nombre:String,
    dependencias:[{
       nombre:String,
       direccion:String,
       telefono:[],
       latitud:String,
       longitud:String,
       paginaWeb:String,
       comentarios:[
           {
               fecha:{type:Date,default:Date.now},
               comentario:String
           }
       ]       
    }],
    requisitos:[],
    categoria:[]    
});        

const Tramite= mongoose.model('tramite',TramiteSchema); 
module.exports=Tramite;