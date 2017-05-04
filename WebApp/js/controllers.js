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
		}
			)
		
	}
       /* $http.post('http://jsonplaceholder.typicode.com/posts', data).then(function (r) {
            //cargarData();
            
            $scope.title = null;
            $scope.body = null;
        })*/
}]);