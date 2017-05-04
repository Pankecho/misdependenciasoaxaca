var app = angular.module('ngMap', [
  'ngRoute',
  'controllers'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/inicio.html',
        controller: 'inicio'
      }).
      when('/busqueda/:palabra', {
        templateUrl: 'partials/buscado.html',
        controller: 'buscado'
      }).
      when('/:id_tramite',{
        templateUrl: 'partials/tramite.html',
        controller: 'tramite'
      })
      otherwise({
        redirectTo: '/'
      });
  }]);

function initMap(data) {
  if(data){
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4
            });
    var infoWindow = new google.maps.InfoWindow({map: map});

    data.forEach( function(element, index) {
      const array = element.coordenadas.split(",");
      var posicion = new google.maps.LatLng(array[0],array[1]);
      var marr = new google.maps.Marker({
          map: map
      });
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var lol = new google.maps.Marker({
          position: pos,
          map: map
        });
        map.center(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
    }else{
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: El servicio de Geolocalización falló.' :
                              'Error: Tu navegador no soporta geolocalización.');
    }
  }else{
    document.getElementById("mapa").innerHtml("<h1>Error</h1><h3>No se ha encontrado el recurso</h3>")
  }
}