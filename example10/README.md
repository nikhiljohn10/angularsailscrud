##Example9:Making header fields sortable

###1:Declare  sortField & reverse  variables in at users state in the router


source:router.js

<br/>
code:
```javascript
      $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope,$API, $stateParams) {
	  
	   $scope.items_per_page = 5;
           $scope.currentPage = 1;
	   
	   $scope.sortField = "id";
           $scope.reverse = true;
	    
	    
	   $API.index("user",$scope);
        
        }
    })

```

###2:Update index method in the API factory like below

<br/>
source:API/API.js

<br/>
code:
```javascript
  
   index: function (model, $scope) {
           
            var url = host + model + "/index";
            var data = {
                 page: $scope.currentPage,
                limit: $scope.items_per_page,
                 sort: $scope.sortField,
                order: $scope.reverse
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
  
```

###3:Update the table headers like below

source:views/user/index.html

<br/>
code:
```
  <th>
      <a href="" ng-click="sortField='id';reverse=!reverse;index();">Id</a>
  </th>
  <th>
      <a href="" ng-click="sortField='name';reverse=!reverse;index();">Name</a>
  </th>
  <th>
      <a href="" ng-click="sortField='age'; reverse=!reverse;index();">Age</a>
  </th>
  <th>
      <a href="" ng-click="sortField='active';reverse=!reverse;index();">Active</a>
  </th>

```