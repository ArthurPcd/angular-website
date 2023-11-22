app.controller('adminCtrl', function ($scope) {

    $scope.users = [
        { id: 0, firstName: 'Admin', lastName: 'JoPak', email: 'admin.jopak@epitech.eu', isAdmin: true, token: 'token000' },
        { id: 1, firstName: 'Arthur', lastName: 'Pacaud', email: 'arthur.pacaud@epitech.eu', isAdmin: true, token: 'token123' },
        { id: 2, firstName: 'Joan', lastName: 'Thomas', email: 'joan.thomas@epitech.eu', isAdmin: true, token: 'token456' },
        { id: 3, firstName: 'John', lastName: 'Doe', email: 'john.doe@test.com', isAdmin: false, token: 'token789' },
        { id: 4, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@test.com', isAdmin: false, token: 'token101' },
        { id: 5, firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@test.com', isAdmin: false, token: 'token102' },
        { id: 6, firstName: 'Carol', lastName: 'Davis', email: 'carol.davis@test.com', isAdmin: false, token: 'token103' },
        { id: 7, firstName: 'David', lastName: 'Evans', email: 'david.evans@test.com', isAdmin: false, token: 'token104' },
        { id: 8, firstName: 'Emma', lastName: 'Fox', email: 'emma.fox@test.com', isAdmin: false, token: 'token105' },
        { id: 9, firstName: 'Fiona', lastName: 'Green', email: 'fiona.green@test.com', isAdmin: false, token: 'token106' },
        { id: 10, firstName: 'George', lastName: 'Hill', email: 'george.hill@test.com', isAdmin: false, token: 'token107' }
    ];

    $scope.createUser = function (user) {
        $scope.users.push(user);
    };

    $scope.deleteUser = function (userId) {
        $scope.users = $scope.users.filter(user => user.id !== userId);
    };

});
