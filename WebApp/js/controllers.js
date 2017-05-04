var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('inicio',['$scope','$http',function($scope,$http){
	const control=this;
	control.palabra='';
	control.tramites=[];
	this.buscar=function() {
		$http.get('http://192.168.18.93:3000/api/busqueda/'+control.palabra)
		.then(function(data){
			control.tramites=data.data.data;
		})
	};
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
.controller('tramite',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
  const control=this;
  $http.get('http://192.168.18.93:3000/api/tramite/'+$routeParams.id).then(function(data){
    control.tramite = data.data.data;
    const datos = data.data.data;
    console.log(data);
    if(data){
          var bounds = new google.maps.LatLngBounds();        
          var myLatLng = {lat: 18.245911, lng: -99.0506198};
          
              var map = new google.maps.Map(document.getElementById("view").getElementsByClassName("mapa")[0], {
                center: myLatLng,
                      zoom: 15
                  });
              console.log("b");
              var infoWindow = new google.maps.InfoWindow({map: map});
              const array = datos.dependencia.sucursal;
              datos.dependencia.sucursales.forEach( function(element) {
                const lat = parseFloat(element.latitud);
                const lng = parseFloat(element.longitud);
                      var posicion = new google.maps.LatLng(lat,lng);
                var marr = new google.maps.Marker({
                  position : posicion,
                      map: map,
                      title: datos.dependencia.nombre
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
function calculateAndDisplayRoute(directionsService, directionsDisplay,posInicial,posFinal) {
          directionsService.route({
          origin: directi,
          destination: document.getElementById('end').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }