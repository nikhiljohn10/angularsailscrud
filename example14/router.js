app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');

    // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope,$API, $stateParams) {
	  
	   $scope.items_per_page = 5;
           $scope.currentPage = 1;
	   
	   $scope.sortField = "id";
           $scope.reverse = true;
	   
	   $scope.selection = [];
	
	   $scope.pageSizeOptions=[5,10,30,50,100,200,500,1000];
	    
	   $scope.hideDatefilter = true;
	   
  
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