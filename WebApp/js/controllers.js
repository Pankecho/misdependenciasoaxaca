var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('inicio',['$scope','$http',function($scope,$http){
	const control=this;
	control.palabra='';
	control.tramites=[];
	this.buscar=function() {                
		$http.get('http://localhost:3000/api/busqueda/'+control.palabra)
		.then(function(data){
            control.palabra='';
            control.tramites=[];
            control.tramite={};
            control.sucursal={};
            control.mostrarSucursal=false;
            control.verTramite=false;
            control.verLista=true;
			control.tramites=data.data.data;      
            control.claseArriba='arriba';
            console.log(control.tramites)
            if(control.tramites==undefined)
                control.hayDatos=false;
            else
            control.hayDatos=true;
		})
	};
    control.mostrarTramite=function(id){
        control.mostrarSucursal=false;
        control.verTramite=true;
        control.verLista=false;

        $http.get('http://localhost:3000/api/tramite/'+id).then(function(data){
        control.tramite = data.data.data;
        const datos = data.data.data;    
        if(data){
            dibujarMapa(datos.dependencia.sucursales,0);              
        }else{
          document.getElementById("view").getElementsByClassName("mapa")[0].innerHtml("<h1>Error</h1><h3>No se ha encontrado el recurso</h3>");
        }
        });}

    control.verSucursal=function(id){
        control.mostrarSucursal=true;
        control.verTramite=false;
        control.verLista=false;
        control.dependencia=control.tramite.dependencia.nombre;         
        $http.get('http://localhost:3000/api/sucursal/'+id)
        .then(function(data){        
            control.sucursal=data.data.data;
            control.comentarios=control.sucursal.comentarios; 
            dibujarMapa([control.sucursal],1);
        });
    }
    control.enviarComentario=function(id){        
        $http.post('http://localhost:3000/api/sucursal/'+id+'/comentario',
        {
            'descripcion':control.comentarioNuevo
        }).then(function(data){        
            control.comentarios.push(data.data.comentario);
            control.comentarioNuevo='';
        })
    }

    control.regresar=function(r){
        switch(r){
            case 1:control.mostrarSucursal=false;
            control.verTramite=false;
            control.verLista=true;
            break;
            case 2:
            control.mostrarSucursal=false;
            control.verTramite=true;
            control.verLista=false;break;
        }
    }
}]);


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                            'Error: El servicio de Geolocalización falló.' :
                            'Error: Tu navegador no soporta geolocalización.');
}

function calculateAndDisplayRoute(directionsService, directionsDisplay,posInicial,posFinal) {
          directionsService.route({
          origin: posInicial,
          destination: posFinal,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }


 function dibujarMapa(coordenadas,i){
    var bounds = new google.maps.LatLngBounds();        
          var myLatLng = {lat: 18.245911, lng: -99.0506198};        
              var map = new google.maps.Map(document.getElementById("view").getElementsByClassName("mapa")[i], {
                center: myLatLng,
                      zoom: 15
                  });              
              var infoWindow = new google.maps.InfoWindow({map: map});
              const array = coordenadas;              
              array.forEach( function(element) {
                const lat = parseFloat(element.latitud);
                const lng = parseFloat(element.longitud);
                var posicion = new google.maps.LatLng(lat,lng);
                var marr = new google.maps.Marker({
                  position : posicion,
                      map: map,   
                      title: element.nombre                   
                });
                bounds.extend(marr.position);
                  });
              map.fitBounds(bounds);
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function(position) {
                      var pos = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                      };
                      var lol = new google.maps.Marker({
                          position: pos,
                          icon: {
                              path: google.maps.SymbolPath.CIRCLE,
                              scale: 5
                            },
                          map: map,
                          title: 'Aqui estas tu'
                      });
                      bounds.extend(lol.position);                    
                      map.fitBounds(bounds);
                      if(array.length == 1){
                        var directionsService = new google.maps.DirectionsService;
                        var directionsDisplay = new google.maps.DirectionsRenderer;

                        directionsDisplay.setMap(map);
                        calculateAndDisplayRoute(directionsService, directionsDisplay,pos,new google.maps.LatLng(parseFloat(array[0].latitud),parseFloat(array[0].longitud)));
                      }
                  },function() {
                      handleLocationError(true, infoWindow, map.getCenter());
                  });        
 }else{    
                  handleLocationError(false, infoWindow, map.getCenter());
              }
}     