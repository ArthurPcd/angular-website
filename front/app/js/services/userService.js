app.service('userService', function($http) {
    this.getUsers = function() {
        return $http.get('/api/users/get');
    };

    this.createUser = function(user) {
        return $http.post('/api/users/create', user);
    };

    this.deleteUser = function(userId) {
        return $http.delete('/api/users/delete' + userId);
    };

    this.updateUser = function(user) {
        return $http.put('/api/users/update' + user.id, user);
    };

});
