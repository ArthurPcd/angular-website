app.service('authService', function($http) {
    this.login = function(loginData) {
        return $http.post('/api/auth/login', loginData);
    };

    this.register = function(registerData) {
        return $http.post('/api/auth/register', registerData);
    };
});
