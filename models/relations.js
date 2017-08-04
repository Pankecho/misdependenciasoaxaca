const Dependencia=require('./dependencia'),
       Comentario=require('./comentario'),
       Sucursal=require('./sucursal'),
       Tramite=require('./tramite'),
       Categoria=require('./categoria');

const dataCat=require('../datos/categoria'),
      dataDepen=require('../datos/dependencia'),
      dataTramite=require('../datos/tramite'),
      dataSucur=require('../datos/sucursal');


Categoria.hasMany(Dependencia,{as:'idCategoria',foreignKey:'id_categoria'});
Dependencia.hasMany(Tramite,{as:'idDependencia',foreignKey:'id_dependencia'});
Dependencia.hasMany(Sucursal,{as:'idDependencia',foreignKey:'id_dependencia'});
Sucursal.hasMany(Comentario,{as:'idSucursal',foreignKey:'id_sucursal'});

Categoria.sync({force:true}).then(()=>{    
    Dependencia.sync({force:true}).then(()=>{
        Sucursal.sync({force:true}).then(()=>{
            Comentario.sync({force:true}).then(()=>{   
            });
            Tramite.sync({force:true}).then(()=>{
                console.log("Sincronizando");
                dataTramite.map((data)=>{
                    Tramite.create(data).then(()=>{
                        console.log("Tramite registrado");
                    });
                });
            });
            dataSucur.map((data)=>{
                Sucursal.create(data).then(()=>{
                    console.log("Sucursal registrada");
                })
            });
        });             
        dataDepen.map((data)=>{
            Dependencia.create(data)
            .then(()=>{console.log("Dependencia creada")});
        })
    });
    
    dataCat.map((data)=>{
        Categoria.create(data)
        .then(()=>{console.log("categorias creadas")});
    });
});


