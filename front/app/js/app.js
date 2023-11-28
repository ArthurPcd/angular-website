var app = angular.module('front', ['ngRoute', 'ngCookies', 'ngAnimate']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/partials/pages/home.html', controller: 'mainCtrl'
        })
        .when('/about', {
            templateUrl: 'app/partials/pages/about.html', controller: 'aboutCtrl'
        })
        .when('/auth', {
            templateUrl: 'app/partials/pages/auth.html', controller: 'authCtrl'
        })
        .when('/admin', {
            templateUrl: 'app/partials/pages/admin.html', controller: 'adminCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});