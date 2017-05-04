var app = angular.module('appDemo',['ngRoute','demoControllers']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/inicio.html',
        controller: 'inicio',
        controllerAs: 'inicioController'
      }).
<<<<<<< HEAD
      when('/tramites/:id',{
=======
      when('/tramite/:id',{
>>>>>>> 01ea424b648a2ef8b55925a7d9db437eb12601a1
        templateUrl: 'partials/tramite.html',
        controller: 'tramite',
        controllerAs: 'tramiteController'
      }).
<<<<<<< HEAD
=======
      when('/:dependencia/sucursal/:id',{
        templateUrl: 'partials/sucursal.html',
        controller:'sucursal',
        controllerAs:"sucursalController"
      }).
>>>>>>> 01ea424b648a2ef8b55925a7d9db437eb12601a1
      otherwise({
        redirectTo: '/'
      });
}]);