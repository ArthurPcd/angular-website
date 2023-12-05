app.controller('profileCtrl', function ($scope, $http, $cookies, $location) {
  $scope.logout = function () {
      return $http.post('/api/auth/logout', {}, {headers: authService.getAuthorizedHeader()})
          .then(function (response) {
              console.log('User logged out successfully:', response.data);
              $cookies.remove('token');
              $location.path('/login');
          })
          .catch(function (error) {
              console.error('Unable to logout:', error.data);
          });
  };
});
