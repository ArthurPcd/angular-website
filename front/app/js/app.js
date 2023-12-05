var app = angular.module('front', ['ngRoute', 'ngCookies', 'ngAnimate']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/partials/pages/home.html', controller: 'mainCtrl'
        })
        .when('/about', {
            templateUrl: 'app/partials/pages/about.html', controller: 'aboutCtrl'
        })
        .when('/admin', {
            templateUrl: 'app/partials/pages/admin.html', controller: 'adminCtrl',
            resolve: {
                authenticated: ['$http', '$cookies', '$location', function ($http, $cookies, $location) {
                    const token = $cookies.get('token');

                    if (!token) {
                        $location.path('/auth');
                        return Promise.reject('User not logged in');
                    }
                    return true;
                }]
            }
        })
        .when('/invoice', {
            templateUrl: 'app/partials/pages/invoice.html', controller: 'invoiceCtrl'
        })
        .when('/profile', {
            templateUrl: 'app/partials/pages/profile.html', controller: 'profileCtrl',
            resolve: {
                authenticated: ['$http', '$cookies', '$location', function ($http, $cookies, $location) {
                    const token = $cookies.get('token');

                    if (!token) {
                        $location.path('/auth');
                        return Promise.reject('User not logged in');
                    }
                    return true;
                }]
            }
        })
        .when('/auth', {
            templateUrl: 'app/partials/pages/auth.html', controller: 'authCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
