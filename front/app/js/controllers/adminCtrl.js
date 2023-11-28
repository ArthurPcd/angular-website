app.controller('adminCtrl', function ($scope, $http, $timeout) {

    $scope.users = [{
        id: 0, firstName: 'Admin', lastName: 'JoPak', email: 'admin.jopak@epitech.eu', isAdmin: true, token: 'token000'
    }, {
        id: 1,
        firstName: 'Arthur',
        lastName: 'Pacaud',
        email: 'arthur.pacaud@epitech.eu',
        isAdmin: true,
        token: 'token123'
    }, {
        id: 2, firstName: 'Joan', lastName: 'Thomas', email: 'joan.thomas@epitech.eu', isAdmin: true, token: 'token456'
    }, {
        id: 3, firstName: 'John', lastName: 'Doe', email: 'john.doe@test.com', isAdmin: false, token: 'token789'
    }, {
        id: 4, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@test.com', isAdmin: false, token: 'token101'
    }, {
        id: 5, firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@test.com', isAdmin: false, token: 'token102'
    }, {
        id: 6, firstName: 'Carol', lastName: 'Davis', email: 'carol.davis@test.com', isAdmin: false, token: 'token103'
    }, {
        id: 7, firstName: 'David', lastName: 'Evans', email: 'david.evans@test.com', isAdmin: false, token: 'token104'
    }, {
        id: 8, firstName: 'Emma', lastName: 'Fox', email: 'emma.fox@test.com', isAdmin: false, token: 'token105'
    }, {
        id: 9, firstName: 'Fiona', lastName: 'Green', email: 'fiona.green@test.com', isAdmin: false, token: 'token106'
    }, {
        id: 10, firstName: 'George', lastName: 'Hill', email: 'george.hill@test.com', isAdmin: false, token: 'token107'
    }];

    $scope.currentPage = 1;
    $scope.pageSize = 10;


    $scope.newUser = {
        id: null, firstName: null, lastName: null, email: null, isAdmin: false, token: null
    }
    $scope.editingUser = null;
    $scope.selectedUser = null;

    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.totalPages) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function (page) {
        $scope.currentPage = page;
    };

    $scope.getPage = function () {
        return 'Page ' + $scope.currentPage + ' sur ' + $scope.totalPages;
    }

    $scope.$watch('users', function () {
        $scope.totalPages = Math.ceil($scope.users.length / $scope.pageSize);
        $scope.pages = [];
        for (let i = 1; i <= $scope.totalPages; i++) {
            $scope.pages.push(i);
        }
        if ($scope.currentPage > $scope.totalPages) {
            $scope.currentPage = $scope.totalPages;
        }
    });

    $scope.createUser = function (user) {
        $scope.users.push(user);
    };

    $scope.deleteUser = function (userId) {
        $scope.users = $scope.users.filter(user => user.id !== userId);
    };


    $scope.openUserModal = function (user) {
        $scope.selectedUser = user;
    };

    $scope.closeUserModal = function () {
        $scope.selectedUser = null;
    };


    $scope.editUser = function (user) {
        $scope.editingUser = user;
    };

    $scope.updateUser = function (user) {
        let index = $scope.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            $scope.users[index] = user;
        }
        $scope.editingUser = null;
    };

    $scope.getUser = function (userId) {
        return $scope.users.find(user => user.id === userId);
    };

    $scope.getLogDate = function (userId) {
        date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 3) + 1);
        return date;

    }

    $scope.showAllUsers = function () {
        let users = [];
        for (let i = 0; i < $scope.getUsersCount(); i++) {
            console.log($scope.users[i]);
            users.push($scope.users[i]);
        }
        return users;
    };

    $scope.getUsersCount = function () {
        return $scope.users.length;
    };

    $scope.getAdminsCount = function () {
        return $scope.users.filter(user => user.isAdmin).length;
    };

    $scope.initOrUpdateUserActivityChart = function () {
        const data = {
            labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
            datasets: [{
                label: 'Activité des utilisateurs',
                data: [50, 45, 40, 55, 62],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {}
        };

        if ($scope.userActivityChart) {
            $scope.userActivityChart.destroy();
        }

        const ctx = document.getElementById('userActivityChart').getContext('2d');
        $scope.userActivityChart = new Chart(ctx, config);
    };

    $scope.initOrUpdateActivityChart = function () {
        const data = {
            labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
            datasets: [{
                label: 'Activité des utilisateurs',
                data: [50, 45, 40, 55, 62],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
                {
                    label: 'Activité des administrateurs',
                    data: [90, 86, 85, 101, 99],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }
            ]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            }
        };

        if ($scope.activityChart) {
            $scope.activityChart.destroy();
        }

        const ctx = document.getElementById('activityChart').getContext('2d');
        $scope.activityChart = new Chart(ctx, config);
    };

    $timeout(function () {
        $scope.initOrUpdateUserActivityChart();
        $scope.initOrUpdateActivityChart();
    }, 0);
});
