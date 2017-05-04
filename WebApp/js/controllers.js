var controllers = angular.module('controllers', []);

controllers.controller('inicio',['$scope','$http',function($scope,$http){

}]);


demoControllers.controller('tramite',['$scope','$http','$routeParams',function($scope,$http){
	$http.get('http://192.168.18.93:3000/api/'+$routeParams.id_tramite).then(function(data){
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
		}else{
			document.getElementById("mapa").innerHtml("<h1>Error</h1><h3>No se ha encontrado el recurso</h3>")
		}
	})
}]);

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: El servicio de Geolocalización falló.' :
                              'Error: Tu navegador no soporta geolocalización.');
}