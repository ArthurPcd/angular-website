app.controller('authCtrl', function($scope, $location) {
    $scope.login = {};
    $scope.register = {};
    $scope.isAdmin = false;

    $scope.submitLogin = function() {
        if (($scope.login.email === 'arthur.pacaud@epitech.eu' || $scope.login.email === 'joan.thomas@epitech.eu') && $scope.login.password === '12345678') {
            $scope.isAdmin = true;
            $location.path('/admin');
            alert('Connexion réussie ! Bienvenue sur le panel d\'administration !\nVotre mail de connexion est : ' + $scope.login.email + '\nVotre mot de passe par défaut est : ' + $scope.login.password + '\nVous pouvez changer votre mot de passe dans la section "Mon compte".');
        } else {
            $scope.isAdmin = false;
            alert('Échec de la connexion. Vérifiez vos identifiants.');
        }
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
