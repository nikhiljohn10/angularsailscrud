app.config(function($locationProvider,$stateProvider, $urlRouterProvider,$routeProvider) {
	
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('users', {
            url: '/',
            templateUrl: 'views/user/index.html',
             controller: function($scope,$API,$stateParams) {
        
           
                  $scope.items_per_page = 5; 
                 
		  $scope.currentPage = 1;
            
                  $scope.sortField="id";
                  
		  $scope.reverse=true;
		  
		  $scope.selection=[];
	 
		  
		  
          
                  $API.index("user",$scope,$scope.userFilter);
                     
			 
              }
        })
        // nested list with custom controller
        
	.state('users.create', {
        url: 'user/create',
        templateUrl: 'views/user/create.html',
        controller: function($scope,$API,$stateParams) {
        
            	  $('#view_container').modal({
		    show:true,
		    backdrop:false
		    });
		    
		  $("#user_name").focus();
          
                }
       
	})
	
	.state('users.view', {
        url: 'user/:id',
        templateUrl: 'views/user/view.html',
        controller: function($scope,$API,$stateParams) {
        
            $API.view("user",$stateParams.id,$scope);
          
              }
       // controller  : 'viewController'
       
	})
	
	.state('users.update', {
        url: 'user/update/:id',
        templateUrl: 'views/user/update.html',
         controller: function($scope,$API,$stateParams) {
        
                         /*
			  $model=findbyId($scope.users,$stateParams.id)
			    
			  if($model)
			  {
			    $scope.model=$model;
			   
			  }  
			  */
			  $scope.findbyId($stateParams.id);
			  
			  
			  $('#view_container').modal({
			show:true,
			 backdrop:false
			});
          
              }
       
	})
	
	              
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('cities', {
            url: '/cities',
            templateUrl: 'views/city/index.html',
            
            // we'll get to this in a bit       
        });
        
});