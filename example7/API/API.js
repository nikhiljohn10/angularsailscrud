app.factory('$API', function ($http, $location) {

    var host = "http://angularsailscrud.herokuapp.com/";

    return {
         
          create: function (model, data, $scope) {
	    
	   
            var url = host + model + "/create";
            $http({
                method: 'POST',
                url: url,
                params: data,
                isArray: true
            })
                .success(function (data, status, headers, config) {
                    // alert("ok:"+angular.toJson(data));
                    $scope.models.push(data);
                    $scope.model = data;
                 
                    $scope.index();
                    $location.path(model + "/" + $scope.model.id);
		    
                })
                .error(function (data, status, headers, config) {
                    
                    // called asynchronously if an error occurs
                    // or server returns response with an e	rror status.
                });
        },
	 
        index: function (model, $scope) {
           
	
            var url = host + model + "/index";
            var data = {
                page: 1,
                limit: 50
              
            };
            $http({
                method: 'GET',
                url: url,
                params: data
            })
                .success(function (data, status, headers, config) {
                   
                    $scope.models = data.data;
                    $scope.totalItems = data.totalItems;
                  
                })
                .error(function (data, status, headers, config) {
                  
                });
        },
	
	   view: function (model, id, $scope) {
	     
	       
            var url = host + model + "/" + id;
          
            $http({
                method: 'GET',
                url: url
            })
                .success(function (data, status, headers, config) {
                  
                    $scope.model = data;
		    
                    if ($scope.model) {
		      
                        $('#view_container').modal({
                            show: true,
                            backdrop: false
                        });
                    }
                })
                .error(function (data, status, headers, config) {
                   
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        },
	   delete: function (model, id, $scope) {
	      
            var url = host + model + "/destroy/" + id;
            $http({
                method: 'DELETE',
                url: url
            })
                .success(function (data, status, headers, config) {
                    
		  $scope.index();
		  
		    /* to handle delete flow from the view dialog box */
		    $('#view_container').modal('hide');  
		    $location.path(model);
                
                })
                .error(function (data, status, headers, config) {
                   ;
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
      
    };
});