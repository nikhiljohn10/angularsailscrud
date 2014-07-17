app.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');

    // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope, $stateParams) {
           
        }
    })


        .state('cities', {
            url: '/city',
            templateUrl: 'views/city/index.html',
            controller: function ($scope, $stateParams) {
             
            }
        })

});