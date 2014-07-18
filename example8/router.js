app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');

    // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope,$API, $stateParams) {
	    
	   $API.index("user",$scope);
        
        }
    })
         .state('users.create', {
            url: '/create',
            templateUrl: 'views/user/create.html',
            controller: function ($scope, $API, $stateParams) {
              
	   
	       
	        $('#view_container').modal({
                    show: true,
                    backdrop: false
                });
              
            }
        })
        .state('users.view', {
            url: '/:id',
            templateUrl: 'views/user/view.html',
            controller: function ($scope, $API, $stateParams) {
		
                $API.view("user", $stateParams.id, $scope);
            }
        })
	
	 .state('users.update', {
            url: '/update/:id',
            templateUrl: 'views/user/update.html',
            controller: function ($scope, $API, $stateParams) {
	      
                $scope.findbyId($stateParams.id);
              
		$('#view_container').modal({
                    show: true,
                    backdrop: false
                });
            }
          }) 

	
            
        .state('cities', {
            url: '/city',
            templateUrl: 'views/city/index.html',
            controller: function ($scope, $stateParams) {
             
            }
        })

});