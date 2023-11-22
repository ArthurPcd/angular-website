app.service('authService', function($http) {
    this.login = function(login) {
        return $http.post('/api/login', login);
    };
    this.register = function(register) {
        return $http.post('/api/register', register);
    };
    this.logout = function() {
        return $http.get('/api/logout');
    };
    this.getUser = function() {
        return $http.get('/api/user');
    };
    this.updateUser = function(user) {
        return $http.put('/api/user', user);
    };
    this.deleteUser = function() {
        return $http.delete('/api/user');
    };
});