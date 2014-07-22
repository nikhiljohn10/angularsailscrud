##Example14:Adding PageSize DropDown

###1.Declare  pageSizeOptions; variable inside the users state in the app router

Note:Which will be used to change the pageSize limit.

eg:
```javascript
 $scope.pageSizeOptions=[5,10,30,50,100,200,500,1000];
```

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
	   
	   $scope.selection = [];
	
	   $scope.pageSizeOptions=[5,10,30,50,100,200,500,1000];
	    
	   $scope.hideDatefilter = true;
	   
  
	   $API.index("user",$scope);
        
        }
    })

```
###2:Add the DropDown markup at bottom of the grid table


source:views/user/index.html


<br/>
code:
```html
  <div class="pull-right">  
    PageSize:<select class="form-control input-sm" ng-model="items_per_page" ng-change="pageChanged()" ng-options="size for size in pageSizeOptions" ></select>
  </div>
```




