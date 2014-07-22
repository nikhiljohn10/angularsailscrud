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
    
    
     
    $scope.toggleSelection = function toggleSelection(id) {
      
        var idx = $scope.selection.indexOf(id);
	
        $("#user_all").attr('checked', false);
	
        // is currently selected
        if (idx > -1) {
	     //already checked so delete from the selection array
	     
            $scope.selection.splice(idx, 1);
        }
        // is newly selected
        else {
	  
            $scope.selection.push(id);
        }
    };

    $scope.selectAll = function ($event) {
      
        var checkbox = $event.target;
      
	for (var i in $scope.models) {
        
	   var idx = $scope.selection.indexOf($scope.models[i].id);
	   
            if (idx > -1) {
	               /* delete if not in the array */
                if (!checkbox.checked) {
                    $scope.selection.splice(idx, 1);
                }
            }
            // is newly selected
            else {
                $scope.selection.push($scope.models[i].id);
            }
        }
    };
    
    
        $scope.deleteAll = function ($model) {
	  
        var r = confirm("Are you sure?");
        if (r != true) {
            return;
        }
        if ($scope.selection.length == 0) {
            alert("No records selected");
            return;
        }
        $API.deleteAll("user", $scope);
    };

     $scope.openDatePicker = function($event,$name) {
         
		$event.preventDefault();
		$event.stopPropagation();
             
	      if($name=="from")
		$scope.from_opened = true;
	      else
		$scope.to_opened = true;
		
     };
     
     $scope.setDateRange = function(field) {
       
         if(field=="from")
		     {
		         
		        $scope.dateFilter[field].setHours(00,00,00,00);
		     
		        if ($scope.dateFilter['to'])
			{
			
			   $scope.dateFilter['to'].setHours(23,59,59,999);
			     
			   $scope.filter['createdAt'] = {'>=':$scope.dateFilter[field],'<=':$scope.dateFilter['to']}; 
			   
			}
			else
			{
			
		           $scope.filter['createdAt'] = {'>=':$scope.dateFilter[field]};
		
			}
		     }
		     else if(field=="to")
		     {
		  
		        $scope.dateFilter[field].setHours(23,59,59,999);
			
			
		        if ($scope.dateFilter['from'])
			{
			   $scope.dateFilter['from'].setHours(00,00,00,00);
			 
			   $scope.filter['createdAt'] = {'>=':$scope.dateFilter['from'],'<=':$scope.dateFilter[field]}; 
			}
			else
			{
		           $scope.filter['createdAt'] = {'<=':$scope.dateFilter[field]}
			}
		     }
       
    };
   
   
}