app.factory('$API', function ($http, $location) {

    var host = "http://angularsailscrud.herokuapp.com/";

    return {
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
                    $scope.showMessage("Sorry!Something went wrong", 'warning', true);
                    // alert("ERR");
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        },
      
    };
});