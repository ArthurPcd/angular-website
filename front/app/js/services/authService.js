app.service('authService', function($http) {
    this.login = function(loginData) {
        return $http.post('/api/auth/login', loginData);
    };

    this.register = function(registerData) {
        return $http.post('/api/auth/register', registerData);
    };

    this.checkIfUserIsLoggedIn = function () {
      const token = $cookies.get('token');
      if (!token) {

          return false;
      }
      return true;
    };

    this.redirectIfNotLoggedIn = function () {
            if (!this.checkIfUserIsLoggedIn()) {
                $location.path('/auth');
            }
        };
});
