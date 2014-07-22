##Example7:Adding Create action for the user model
 
###1:Add create method in the API factory


update:API/API.js

<br/>
code:
eg:
```javascript
  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');

    $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope,$API, $stateParams) {
	    
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

	
            
        .state('cities', {
            url: '/city',
            templateUrl: 'views/city/index.html',
            controller: function ($scope, $stateParams) {
             
            }
        })

});
```
Usage:
```javascript
 $API.create("user", $user, $scope);

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

###2:Add a create method on UserController

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
    
    $scope.index = function () {
      
        $API.index("user", $scope);
    };

    
     $scope.create = function ($user) {
      
       $API.create("user", $user, $scope);
    
    }; 
   

   
}
```
<br/>
Usage:
```
create(user);

```
###3:Add a create  form markup

source:views/user/create.html

eg:
```
<div class="modal-header">
    <a ui-sref="users" type="button" class="close" ng-click="closeModal();" aria-hidden="true">&times;</a>

    <h3 class="modal-title">Create New user</h3>
</div>

<div class="modal-body">
    <form role="form" name="userform" id="userform">
    
        <div class="form-group" ng-class="{ 'has-error' : userform.name.$invalid && !userform.name.$pristine }">
        
            <input type="text" ng-model="user.name" id="user_name" size="30" placeholder="Name" class="form-control"
                   ng-minlength="2" ng-maxlength="10" name="name" required>

            <p ng-show="userform.name.$error.minlength" class="help-block">Name is too short(min:2 chars).</p>

            <p ng-show="userform.name.$error.maxlength" class="help-block">Name is too long(max:10 chars).</p>
           

        </div>
        <div class="form-group" ng-class="{ 'has-error' : userform.age.$invalid && !userform.age.$pristine }">

            <input type="text" ng-model="user.age" name="age" placeholder="Age" class="form-control" required>

            <p ng-show="userform.age.$invalid && !userform.age.$pristine" class="help-block">Age is required.</p>

        </div>

        <div class="modal-footer">
            <button type="submit" value="SUBMIT" class="btn btn-primary" ng-click="create(user)"
                    ng-disabled="userform.$invalid">SUBMIT
            </button>

        </div>
    </form>

```
###4:Add a create button at the top of the grid

eg:
```
 <a ui-sref="users.create" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Create</a>
 
```
<br/>
code:
```
     <div ng-controller="UserCtrl">

			<div class="col-md-8 col-md-offset-1">


				  <h2>Users</h2>
				  
				  <a ui-sref="users.create" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Create</a>
				
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


###5:Add a create button at the record view too

eg:
```
  <a ui-sref="users.create" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Create</a>
 
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
