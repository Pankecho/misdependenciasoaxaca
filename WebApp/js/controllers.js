var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('inicio',['$scope','$http',function($scope,$http){
	const control=this;
	control.palabra='';
	control.tramites=[];
	this.buscar=function() {
		console.log(control.palabra)
		$http.get('http://192.168.18.93:3000/api/busqueda/'+control.palabra)
		.then(function(data){
			console.log(data);	
			control.tramites=data.data.data
			console.log(control.tramites)
		});		
	}
}])
.controller('sucursal',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    var control=this;
    control.dependencia=$routeParams.dependencia;
    $http.get('http://192.168.18.93:3000/api/sucursal/'+$routeParams.id)
    .then(function(data){        
        control.sucursal=data.data.data;
        control.comentarios=control.sucursal.comentarios;        
    });

    control.enviarComentario=function(){        
        $http.post('http://192.168.18.93:3000/api/sucursal/'+$routeParams.id+'/comentario',
        {
            'descripcion':control.comentarioNuevo
        }).then(function(data){        
            control.comentarios.push(data.data.comentario);
            control.comentarioNuevo='';
        })
    }
}])
.controller('tramite',['$scope','$http','$routeParams',function($scope,$http){
	$http.get('http://192.168.18.93:3000/api/tramite/'+$routeParams.id_tramite).then(function(data){
		if(data){
          var bounds = new google.maps.LatLngBounds();        
          var myLatLng = {lat: 18.245911, lng: -99.0506198};
              var map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                      zoom: 20
                  });
              var infoWindow = new google.maps.InfoWindow({map: map});
              data.dependencia.sucursales.forEach( function(element) {
                const lat = parseFloat(element.latitud);
                const lng = parseFloat(element.longitud);
                      var posicion = new google.maps.LatLng(lat,lng);
                var marr = new google.maps.Marker({
                  position : posicion,
                      map: map,
                      title: data.dependencia.nombre
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
                      //map.setCenter(promedio);
                      map.fitBounds(bounds);
                  },function() {
                      handleLocationError(true, infoWindow, map.getCenter());
                  });
              }else{
                  // Browser doesn't support Geolocation
                  handleLocationError(false, infoWindow, map.getCenter());
              }
        }else{
          document.getElementById("mapa").innerHtml("<h1>Error</h1><h3>No se ha encontrado el recurso</h3>");
        }
	})
}]);

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                            'Error: El servicio de Geolocalización falló.' :
                            'Error: Tu navegador no soporta geolocalización.');
}

