app.factory('$API', function ($http, $location) {

    // var host = "http://localhost:1337/";
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
        }
      
    };
});