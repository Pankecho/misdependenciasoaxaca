var app = angular.module('appTodo', [
  'ngRoute',
  'Controllers'
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