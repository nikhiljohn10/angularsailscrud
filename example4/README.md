##Example4:List All Available users from the SailsJs Rest API

###1.Write a new Factory with an index method to fetch all user records from REST API 
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
	      }
      
    };
});
```
Usage: $API.index("user",$scope);
URL:http://angularsailscrud.herokuapp.com/user?page=1&limit=10  

  #####JSON response:
```javascript

  {
  "data": [
    {
      "age": 35,
      "name": "sirin",
      "active": "true",
      "createdAt": "2014-07-17T12:09:52.992Z",
      "updatedAt": "2014-07-17T12:09:52.992Z",
      "id": 1
    },
    {
      "age": 436,
      "name": "kjnkjn",
      "active": "true",
      "createdAt": "2014-07-17T12:09:58.820Z",
      "updatedAt": "2014-07-17T12:09:58.820Z",
      "id": 2
    }
  ],
  "totalItems": 2
}
```
 

###2.Intgrate the API file into index.html

<br/>
code:
```
 <script src="API/API.js"></script>
	       
```
###3:Call the API method "index" inside the anonymous controller attached to the "users" state inside router.js

This call will fetch all  user records when we access the path /users
eg:
```javascript
$API.index("user",$scope);
```

update router.js like below,

source:router.js
<br/>
code:
```javascript
  app.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');
    $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope,$API, $stateParams) {
	    
	   $API.index("user",$scope);
        
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

###4:Update the view file for listing all users using ng-repeat angularJs directive

source:views/user/index.html

<br/>
code:

```
		<div class="col-md-8 col-md-offset-1">


				  <h2>Users</h2>
				
				  <hr/>
						<div class="table-responsive">
						
						
							      <table class="table table-bordered table-hover table-condensed">
								
								  <th>Id</th> 
								  
								  <th>Name</th> 
								  
								  <th>Age</th>
								  
								  <th>Active</th>
								  
								  <tr ng-repeat="user in models">
								      <td>{{user.id}}</td>
								      <td>{{user.name}}</td>
								      <td>{{user.age}}</td>
								      <td>{{user.active}}</td>
								      

								  </tr>
							      </table>
						    

						</div>

		      
			</div>
```
