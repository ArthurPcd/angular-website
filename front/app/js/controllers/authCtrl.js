app.controller('authCtrl', function($scope, $location, $http) {
    $scope.login = {};
    $scope.register = {};
    $scope.isAdmin = false;

    $scope.submitLogin = function() {
        $http.post('http://localhost:8080/api/auth/login', {email: $scope.login.email, password: $scope.login.password})
          .then(function(response) {
              const message = response.data;
              $location.path('/admin');
              alert('Connexion réussie ! Bienvenue sur le panel d\'administration !');
          })
          .catch(function(error) {
              console.error('Error logging in:', error);
              alert('Échec de la connexion. Vérifiez vos identifiants.');
          });
    };

    $scope.capitalizeFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    $scope.submitRegister = function() {
        var firstNameCapitalized = $scope.capitalizeFirstLetter($scope.register.firstName);
        var lastNameCapitalized = $scope.capitalizeFirstLetter($scope.register.lastName);

        console.log('Inscription:', $scope.register);
        alert('Inscription réussie pour ' + firstNameCapitalized + ' ' + lastNameCapitalized);
    };
});
