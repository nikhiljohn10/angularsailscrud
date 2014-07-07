app.config(function($locationProvider,$stateProvider, $urlRouterProvider,$routeProvider) {
	
    $urlRouterProvider.otherwise('/user');
    
	              
         // HOME STATES AND NESTED VIEWS ========================================
	
        .state('cities', {
            url: '/city',
            templateUrl: 'views/city/index.html',
             controller: function($scope,$API,$stateParams) {
        
           
                  $scope.items_per_page = 5; 
                 
		  $scope.currentPage = 1;
            
                  $scope.sortField="id";
                  
		  $scope.reverse=true;
		  
		  $scope.selection=[];
	 
		  
		  
          
                  $API.index("city",$scope,$scope.userFilter);
                     
			 
              }
        })
	

	.state('cities.create', {
        url: '/create',
        templateUrl: 'views/city/create.html',
        controller: function($scope,$API,$stateParams) {
        
            	  $('#view_container').modal({
		    show:true,
		    backdrop:false
		    });
		    
		 // $("#user_name").focus();
          
                }
       
	})
	
	.state('cities.view', {
        url: '/:id',
        templateUrl: 'views/city/view.html',
        controller: function($scope,$API,$stateParams) {
        
            $API.view("city",$stateParams.id,$scope);
          
              }
       // controller  : 'viewController'
       
	})
	
	.state('cities.update', {
        url: '/update/:id',
        templateUrl: 'views/city/update.html',
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
	/*
        .state('cities', {
            url: '/cities',
            templateUrl: 'views/city/index.html',
            
            // we'll get to this in a bit       
        });
        */
});