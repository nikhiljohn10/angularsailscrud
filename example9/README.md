##Example9:Adding Pagination to the grid view

###1:Add ui-bootstrap module into the app


reference:http://angular-ui.github.io/bootstrap/

<br/>
code:
```
   <script src="js/ui-bootstrap-tpls-0.11.0.min.js"></script>

```

###2:Update App settings

<br/>
source:index.html

<br/>
code:
```javascript
  
  var app = angular.module('app',['ngRoute','ui.router','ngResource','ui.bootstrap']);
  
```

###3:Add the pagination widget into the user grid view. ie index.html

source:views/user/index.html

<br/>
code:
```
    <pagination total-items="totalItems" items-per-page="items_per_page" ng-model="currentPage" ng-change="pageChanged()"></pagination>

```

###4:Add a pageChanged method  into the UserController

<br/>
source:controllers/UserController.js

eg:
```javascript
 $scope.pageChanged = function () {
       
        $API.index("user", $scope);
      
    };

```

###5:Update the users state in the app router

source:router.js

<br/>
eg:
```javascript

  $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope,$API, $stateParams) {
	  
	   $scope.items_per_page = 5;
           $scope.currentPage = 1;
	    
	    
	   $API.index("user",$scope);
        
        }
    })
 
```


###6:Update index method in the API factory like below

source:router.js

<br/>
eg:
```javascript

  index: function (model, $scope) {
           
            var url = host + model + "/index";
            var data = {
                page: $scope.currentPage,
                limit: $scope.items_per_page
              
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

