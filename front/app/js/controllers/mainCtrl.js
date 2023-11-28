app.controller('mainCtrl', function ($scope, $http, $cookies, $location) {
    $scope.message = 'Bienvenue sur notre application.';
    $scope.user = {};
    $scope.user.username = $cookies.get('username');
    $scope.user.password = $cookies.get('password');
    $scope.user.remember = $cookies.get('remember');
    $scope.login = function () {
        $http.post('/api/login', $scope.user)
            .success(function (data) {
                $cookies.put('username', $scope.user.username);
                $cookies.put('password', $scope.user.password);
                $cookies.put('remember', $scope.user.remember);
                $location.path('/admin');
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.logout = function () {
        $cookies.remove('username');
        $cookies.remove('password');
        $cookies.remove('remember');
        $location.path('/');
    };
});
