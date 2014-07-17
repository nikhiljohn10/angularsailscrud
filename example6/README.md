##Example6:Add Delete action for each records
 
###1:Add delete method in the API factory


update:API/API.js

<br/>
code:
eg:
```javascript
  delete: function (model, id, $scope) {
  
            var url = host + model + "/destroy/" + id;
            $http({
                method: 'DELETE',
                url: url
            })
                .success(function (data, status, headers, config) {
                    
		   $('#view_container').modal('hide');
                    
                    $scope.index();
                
                })
                .error(function (data, status, headers, config) {
                   ;
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
```
Usage:
```javascript
$API.delete(2);

```

  ####JSON response:
```javascript

  {
  "age": 436,
  "name": "kjnkjn",
  "active": "true",
  "createdAt": "2014-07-17T12:09:58.820Z",
  "updatedAt": "2014-07-17T12:09:58.820Z",
  "id": 2
  }
```

###2:Add a delete method on UserController

source:controllers/UserController.js

<br/>
code:
```javascript
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
   
}
```
<br/>
Usage:
```
delete(2);

```

###3:Add a delete button for each of the records in the grid

eg:
```
 <a href="" ng-click="delete(user.id)" class="btn btn-danger glyphicon glyphicon-remove"></a>
 
```
<br/>
code:
```
    <div ng-controller="UserCtrl">

			<div class="col-md-8 col-md-offset-1">


				  <h2>Users</h2>
				
				  <hr/>
						<div class="table-responsive">
						
						
							      <table class="table table-bordered table-hover table-condensed">
								
								  <th>Id</th> 
								  
								  <th>Name</th> 
								  
								  <th>Age</th>
								  
								  <th>Active</th>
								  
								  <th colspan="3" class="col-md-3">Actions</th>
								  
								  <tr ng-repeat="user in models">
								      <td>{{user.id}}</td>
								      <td>{{user.name}}</td>
								      <td>{{user.age}}</td>
								      <td>{{user.active}}</td>
								      
								      <td>
								        
								         <a ui-sref="users.view({id:user.id})" class="btn btn-default glyphicon glyphicon-eye-open"></a>
                                                                         <a href="" ng-click="delete(user.id)" class="btn btn-danger glyphicon glyphicon-remove"></a>
                                                                      </td>
								      

								  </tr>
							      </table>
						    

						</div>

		      
			</div>
       
       
                        <!--Modal to display Nested views-->
                        <div id="view_container" class="modal">


			      <div class="modal-dialog">

				  <div class="modal-content">


				      <div ui-view>View here</div>

				  </div>
				  <!-- /.modal-content -->
			      </div>
			      <!-- /.modal-dialog -->
			 </div>
			  <!-- /.modal -->
</div><!--End UserCtrl-->

```

###4.Add a index method on UserController which can be used to refresh the updated table records
source:controller/UserController.js
<br/>
code:
```javascript

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



   
}

```

###5:Add a delete button at the record view too

eg:
```
 <a href="" ng-click="delete(user.id)" class="btn btn-danger glyphicon glyphicon-remove"></a>
 
```
<br/>
update file:views/user/view.html

```
<div class="modal-header">
    <a ui-sref="users" type="button" ng-click="closeModal()" class="close" aria-hidden="true">&times;</a>

    <h3 class="modal-title">View #{{model.id}}</h3>

</div>


<div class="modal-body">

    <div class="pull-right">
        <a href="" ng-click="delete(model.id)" class="btn btn-danger glyphicon glyphicon-remove"></a>
    </div>
    
    <ul>
        <li>Id:{{model.id}}</li>
        <li>Name:{{model.name}}</li>
        <li>Age:{{model.age}}</li>
        <li>Active:{{model.active}}</li>
    </ul>

</div>
```
