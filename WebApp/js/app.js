var app = angular.module('appDemo',['ngRoute','demoControllers']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/inicio.html',
        controller: 'inicio',
        controllerAs: 'inicioController'
      }).
      when('/tramite/:id',{
        templateUrl: 'partials/tramite.html',
        controller: 'tramite',
        controllerAs: 'tramiteController'
      }).
      when('/:dependencia/sucursal/:id',{
        templateUrl: 'partials/sucursal.html',
        controller:'sucursal',
        controllerAs:"sucursalController"
      }).
      otherwise({
        redirectTo: '/'
      });
}]);