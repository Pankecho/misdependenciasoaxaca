const Dependencia=require('./dependencia'),
       Comentario=require('./comentario'),
       Sucursal=require('./sucursal'),
       Tramite=require('./tramite'),
       Categoria=require('./categoria');

Categoria.belongsToMany(Dependencia,{through:'idCategoria'});
Dependencia.belongsToMany(Tramite,{through:'idDependencia'});
Dependencia.belongsToMany(Sucursal,{through:'idDependencia'});
Sucursal.belongsToMany(Comentario,{through:'idSucursal'});

Categoria.sync({force:true}).then(()=>{
    Dependencia.sync({force:true}).then(()=>{
        Sucursal.sync({force:true}).then(()=>{
            Comentario.sync({force:true}).then(()=>{   
            });
            Tramite.sync({force:true}).then(()=>{
                console.log("Sincronizando");
            });
        });             
    });
    Categoria.create({nombre:"Educacion"})
    .then((d)=>{
        console.log("Creada categoria");
    })
    .catch((e)=>{
        console.log(e);
    });
});


