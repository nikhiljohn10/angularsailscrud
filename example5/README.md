##Example5:Add View action for each records
 
###1:Add a nested view container at index file of user model to load all nested dialog boxes/popups.
<br/>
This container will be used to popup all nested views of the user model.
<br/>
Note1:From here on all user model related views  will be under UserCtrl
eg:
```
  <div ng-controller="UserCtrl">
  
  </div>
```
<br/>
Note2:We are using Bootstrap modal for poping nested dialog boxes.
<br/>
Note3:To know how you can user a bootstrap modal. look here:http://getbootstrap.com/javascript/#modals
<br/>
source:views/user/index.php

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
                          
                                                                      </td>
								      

								  </tr>
							      </table>
						    

						</div>

		      
			</div>
       
       
                        <!--Modal to display Nested views-->
                        <div id="view_container" class="modal">


			      <div class="modal-dialog">

				  <div class="modal-content">


				      <div ui-view>Nested view load here</div>

				  </div>
				  <!-- /.modal-content -->
			      </div>
			      <!-- /.modal-dialog -->
			 </div>
			  <!-- /.modal -->
</div><!--End UserCtrl-->

```

###2.Add view method into API factory
source:API/API.js
<br/>
code:
```javascript

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

```
Usage: $API.view("user", 2, $scope);
URL:http://angularsailscrud.herokuapp.com/user/2 

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

###3.Add users.view state into the app router

source:router.js

<br/>
code:javascript
```
 app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');

    $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope,$API, $stateParams) {
	    
	   $API.index("user",$scope);
        
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
###4:Add UserController

source:controllers/UserController.js
<br/>
Note1:For now the UserController just have single method which is used to close Bootstrap modal.
<br/>
Note2:You can write as many as functions inside this Controller as per your need.
<br/>
code:
```javascript
function UserCtrl($scope,$http,$API) {
 

    $scope.closeModal = function () {
        $('#view_container').modal('toggle');
    };
   
}
```

###5:Add user model's view file

source:views/user/view.php
```
<div class="modal-header">
    <a ui-sref="users" type="button" ng-click="closeModal()" class="close" aria-hidden="true">&times;</a>

    <h3 class="modal-title">View #{{model.id}}</h3>

</div>


<div class="modal-body">

    <ul>
        <li>Id:{{model.id}}</li>
        <li>Name:{{model.name}}</li>
        <li>Age:{{model.age}}</li>
        <li>Active:{{model.active}}</li>
    </ul>

</div>
```

###6:Place a view button for each records in the table

example view button to the users.view state:
<br/>
code:
```
<a ui-sref="users.view({id:user.id})" class="btn btn-default glyphicon glyphicon-eye-open"></a>

```
<br/>
Now update file:views/user/index.html
<br/>
code:

```
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
                          
                                                                      </td>
								      

								  </tr>
							      </table>
```

						    
