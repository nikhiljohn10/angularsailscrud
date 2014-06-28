 app.factory('$API', function($http,$location) {
	 
	        //var host = "http://localhost:1337/";
	        var host = "http://angularsailscrud.herokuapp.com/";
	        
	    return {
		      create:function(model,data,$scope) {
			   
			     var url=host+model+"/create";
		           
		                
		                 $http({
		                         method: 'POST', 
		                            url: url,
		                         params: data,
		                         isArray:true
		                            }).
				  success(function(data, status, headers, config) {
				  
				   // alert("ok:"+angular.toJson(data));
				    $scope.models.push(data);
				    $scope.model=data;
				    
				    
				    $scope.showMessage("Succesfully Added!",'success',true);
	 
	                            $scope.filter();
	                                
	                            $location.path(model+"/"+$scope.model.id);
				  
				  
				  }).
				  error(function(data, status, headers, config) {
				  
				     $scope.showMessage("Sorry!Something went wrong",'warning',true); 
				    // alert("ERR"+data);
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
			  },
		  
		      update:function(model,data,$scope) {
			       var url=host+model+"/update/"+data.id;
		           
		                
		                $http( {
		                         method: 'POST', 
		                            url: url,
		                         params: data,
		                         isArray:true
		                            }).
				  success(function(data, status, headers, config) {
				  
				   // alert("ok:"+angular.toJson(data));
				   // $scope.users.push(data);
				    $scope.model=data;
				    
				    
				    $scope.showMessage("Succesfully Added!",'success',true);
	 
	                            $location.path(model+"/"+$scope.model.id);
				  
				  
				  }).
				  error(function(data, status, headers, config) {
				  
				     $scope.showMessage("Sorry!Something went wrong",'warning',true); 
				    // alert("ERR"+data);
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
			  },
		      view:function(model,id,$scope) {
		      
		                 
			               
		                     var url=host+model+"/"+id;
		                      //alert("URL:"+url);
		                      
				    $http( {
					      method: 'GET', 
						  url: url
					    
						  }).
					success(function(data, status, headers, config) {
					
					 //alert("ok:"+angular.toJson(data));
					 // $scope.users.push(data);
					  $scope.model=data;
					   
					    if($scope.model)
					    {
					      $('#view_container').modal({
					      show:true,
					      backdrop:false
					      });
					      
					    } 
					  
					   
					 
					
					}).
					error(function(data, status, headers, config) {
					
					 
					   $scope.showMessage("Sorry!Something went wrong",'warning',true); 
					 // alert("ERR");
					  // called asynchronously if an error occurs
					  // or server returns response with an error status.
					});
					
			  },
		      index:function(model,$scope,filter) {
		           
		               
			        //  $scope.test();
				   
		                  var Nfilter={};
				  
				  /* Remove empty fields */
				  for(var field in filter)
				  {
				     if (filter[field]) {
                                  
				        Nfilter[field]={startsWith:filter[field]};
                                    }
				  }
	                         
		               
		              var url=host+model+"/index";
		              
		                 var data={
		                           page:$scope.currentPage,
		                           limit:$scope.items_per_page,
		                           filter:Nfilter,
		                           sort:$scope.sortField,
		                           order:$scope.reverse
		                          };
		             
		                $http({
		                       method: 'GET',
		                       url: url,
		                       params:data
		                       }).
				  success(function(data, status, headers, config) {
				  
				    //alert("N:"+angular.toJson(data));
				   // $scope.totalItems=data.length;
				 //  $scope.removeEmptyFields();
				   $scope.models=data.data;
				   $scope.totalItems=data.totalItems;
				  // $scope.test();
				  //  $scope.userFilter="";
				  
				  }).
				  error(function(data, status, headers, config) {
				   
				    // alert("N:"+angular.toJson(data));
				     
				      $scope.showMessage("Sorry!Something went wrong",'warning',true); 
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
				  
				     
			  },
		      delete:function(model,id,$scope) {
		       
		              var url=host+model+"/destroy/"+id;
		              
		               $http({method: 'DELETE', url: url}).
				  success(function(data, status, headers, config) {
				  
				  
				           $('#view_container').modal('hide');
               
					    $scope.showMessage("Deleted Succesfully!",'success',true); 
					    
					    $scope.filter();
					
					    
					   // $scope.users.splice( $scope.users.indexOf(data), 1 );
					    
					    $location.path("/");
				  
				  }).
				  error(function(data, status, headers, config) {
				  
				             $scope.showMessage("Sorry!Something went wrong"+data,'warning',true); 
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
		         
		       },	  
                      deleteAll:function(model,$scope) {
		       
		              var url=host+model+"/destroyAll/";
		              
			       var data={
		                           ids:$scope.selection,
		                           
		                        };
					  
		               $http({method: 'DELETE',
				      url: url,
		                      params:data
				   
			         }).
				  success(function(data, status, headers, config) {
				  
				        // alert(angular.toJson(data));
				           $('#view_container').modal('hide');
               
					    $scope.showMessage("Deleted Succesfully!",'success',true); 
					    
					    $scope.filter();
					
					    
					   // $scope.users.splice( $scope.users.indexOf(data), 1 );
					    
					    $location.path("/");
				  
				  }).
				  error(function(data, status, headers, config) {
				  
				             $scope.showMessage("Sorry!Something went wrong:"+data,'warning',true); 
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
		         
		       },	  
	              };	
	});	