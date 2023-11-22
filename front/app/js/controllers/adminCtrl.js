app.controller('adminCtrl', function($scope) {
    if (!$scope.isAdmin) {
        $location.path('/');
        return;
    }

    $scope.users = [
        { id: 1, name: 'Arthur', email: 'arthur.pacaud@epitech.eu' },
        { id: 2, name: 'Joan', email: 'joan.thomas@epitech.eu' }
    ];

    $scope.deleteUser = function(userId) {
        $scope.users = $scope.users.filter(user => user.id !== userId);
    };
});
