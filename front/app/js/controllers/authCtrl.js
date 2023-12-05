app.controller('authCtrl', function ($scope, $location, $http, $cookies) {
  $scope.login = {};
  $scope.register = {};
  $scope.isAdmin = false;

  $scope.submitLogin = function () {
    $http.post('http://localhost:8080/api/auth/login', {email: $scope.login.email, password: $scope.login.password}, {
      transformResponse: [function (data) {
        return data;
      }]
    })
      .then(function (response) {
        const token = response.data;
        $cookies.put('token', token);
        $location.path('/profile');
      })
      .catch(function (error) {
        console.error('Error logging in:', error);
        alert('Échec de la connexion. Vérifiez vos identifiants.');
      });
  };

  $scope.capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  $scope.submitRegister = function () {
    var firstNameCapitalized = $scope.capitalizeFirstLetter($scope.register.firstName);
    var lastNameCapitalized = $scope.capitalizeFirstLetter($scope.register.lastName);

    console.log('Inscription:', $scope.register);
    alert('Inscription réussie pour ' + firstNameCapitalized + ' ' + lastNameCapitalized);
  };

  $scope.getAuthorizedHeader = function () {
          return { 'Authorization': 'Bearer ' + $cookies.get('token') };
      };
});
