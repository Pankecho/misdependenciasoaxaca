var app = angular.module('appDemo',['ngRoute','demoControllers']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/inicio.html',
        controller: 'inicio',
        controllerAs: 'controller'
      })
      .otherwise({redirectTo:'/'});      
}]);