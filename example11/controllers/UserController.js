function UserCtrl($scope,$http,$API) {
 


    $scope.closeModal = function () {
        $('#view_container').modal('toggle');
    };

    $scope.delete = function ($id) {
        var r = confirm("Are you sure?");
        if (r != true) {
            return;
        }
        $API.delete("user", $id, $scope);
    };
    
    $scope.index = function () {
      
        $API.index("user", $scope);
    };

    
     $scope.create = function ($user) {
      
       $API.create("user", $user, $scope);
    
    }; 
    
     $scope.save = function ($user) {
        //alert("cool");
        $API.update("user", $user, $scope);
    };
    
      $scope.findbyId = function (id) {
        for (var i = 0; i < $scope.models.length; i++) {
            if ($scope.models[i].id == id) {
                $scope.model = $scope.models[i];
                return;
                //return obj[i];
            }
        }
      };
   
    $scope.pageChanged = function () {
       
        $API.index("user", $scope);
      
    };

   
}