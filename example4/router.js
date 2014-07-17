app.config(function ($locationProvider, $stateProvider, $urlRouterProvider, $routeProvider) {
    $urlRouterProvider.otherwise('/user');

    // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope,$API, $stateParams) {
	    
	   $API.index("user",$scope);
        
        }
    })


        .state('cities', {
            url: '/city',
            templateUrl: 'views/city/index.html',
            controller: function ($scope, $stateParams) {
             
            }
        })

});