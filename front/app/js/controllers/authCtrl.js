app.controller('authCtrl', function($scope) {
    $scope.login = {};
    $scope.register = {};

    $scope.submitLogin = function() {
        if (($scope.login.email === 'arthur.pacaud@epitech.eu' || $scope.login.email === 'joan.thomas@epitech.eu') && $scope.login.password === '12345678') {
            alert('Connexion réussie!');
        } else {
            alert('Échec de la connexion. Vérifiez vos identifiants.');
        }
    };

    $scope.submitRegister = function() {
        console.log('Inscription:', $scope.register);
        alert('Inscription réussie pour ' + uppercase($scope.register.firstName) + ' ' + $scope.register.lastName);
    };
});
