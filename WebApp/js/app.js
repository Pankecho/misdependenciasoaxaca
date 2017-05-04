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
        templateUrl: 'partial/tramite.html',
        controller: 'tramite',
        controllerAs: 'tramiteController'
      }).
      when('/sucursal/:id',{
        templateUrl: 'sucursal.html'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);