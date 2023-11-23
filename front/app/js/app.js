var app = angular.module('front', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/partials/home.html', controller: 'mainCtrl'
        })
        .when('/about', {
            templateUrl: 'app/partials/about.html', controller: 'aboutCtrl'
        })
        .when('/auth', {
            templateUrl: 'app/partials/auth.html', controller: 'authCtrl'
        })
        .when('/admin', {
            templateUrl: 'app/partials/admin.html', controller: 'adminCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
