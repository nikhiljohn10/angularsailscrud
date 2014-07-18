##Example7:Adding Update action for the user model
 
###1:Add update method in the API factory


update:API/API.js

<br/>
code:
```javascript
   update: function (model, data, $scope) {
            var url = host + model + "/update/" + data.id;
            $http({
                method: 'POST',
                url: url,
                params: data,
                isArray: true
            })
                .success(function (data, status, headers, config) {
                   
                    $scope.model = data;
		    
                    $location.path(model + "/" + $scope.model.id);
                })
                .error(function (data, status, headers, config) {
                    $scope.showMessage("Sorry!Something went wrong", 'warning', true);
                    // alert("ERR"+data);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
          },

```
Usage:
```javascript
$API.update("user", $user, $scope)

```

  ####JSON response:
```javascript

  {
  "age": 436,
  "name": "Updated Name here",
  "active": "true",
  "createdAt": "2014-07-17T12:09:58.820Z",
  "updatedAt": "2014-07-17T12:09:58.820Z",
  "id": 2
  }
```
###2:Add update state into the app router.js

<br/>
source:router.js

<br/>
code:
```javascript
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');

    // HOME STATES AND NESTED VIEWS ========================================
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
	
	 .state('users.update', {
            url: '/update/:id',
            templateUrl: 'views/user/update.html',
            controller: function ($scope, $API, $stateParams) {
	      
                $scope.findbyId($stateParams.id);
              
		$('#view_container').modal({
                    show: true,
                    backdrop: false
                });
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

###3:Add  save & findbyId methods on UserController

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
    
     $scope.save = function ($user) {
        $API.update("user", $user, $scope);
    };
    
     $scope.findbyId = function (id) {
        for (var i = 0; i < $scope.models.length; i++) {
            if ($scope.models[i].id == id) {
              
                $scope.model = $scope.models[i];
               
               return;
              
            }
        }
      };
   

   
}

```
<br/>
Usage:
```
save(user);

```
###4:Add a update  form view

<br/>
source:views/user/update.html

eg:
```
<div class="modal-header">
    <a ui-sref="users" type="button" class="close" ng-click="closeModal();" aria-hidden="true">&times;</a>

    <h3 class="modal-title">Update #{{model.id}}</h3>
    <a ng-href="#/user/create" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Create</a>
</div>

<div class="modal-body">

    <div class="pull-right">
        <a ui-sref="users.view({id:model.id})" class="btn btn-primary glyphicon glyphicon-eye-open"></a>
        <a href="" ng-click="delete(model)" class="btn btn-danger glyphicon glyphicon-remove"></a>
    </div>

    <form role="form">
        <input type="hidden" ng-model="model.id">


        <div class="form-group">
            <label for="model.name">Name:</label>
            <input type="text" ng-model="model.name" size="30" placeholder="Name" value="{{model.name}}"
                   class="form-control">
        </div>
        <div class="form-group">
            <label for="user.age">Age:</label>
            <input type="text" ng-model="model.age" size="30" placeholder="Age" value="{{model.age}}"
                   class="form-control">
        </div>


        <div class="modal-footer">
            <button type="submit" value="SUBMIT" class="btn btn-primary" ng-click="save(model)">SUBMIT</button>

            <!--<button class="btn btn-primary" ng-click="ok()">OK</button>-->
            <!--<button class="btn btn-warning" ng-click="cancel()">Cancel</button>-->
        </div>

    </form>

</div>

```
###4:Add an update button for each records in the grid

source:views/user/index.html

<br/>
eg:
```
 <a ui-sref="users.update({id:user.id})" class="btn btn-primary glyphicon glyphicon-pencil"></a>
 
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
                                                                         <a ui-sref="users.update({id:user.id})" class="btn btn-primary glyphicon glyphicon-pencil"></a>
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



