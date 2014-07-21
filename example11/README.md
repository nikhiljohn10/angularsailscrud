##Example11:Adding filters

###1:Add the filters for all fields in the grid view


source:views/user/index.html

<br/>
code:
```
      <tr>

	  <form id="filter_form">
	  
	      <td><input type="number" size="4" ng-model="userFilter.id" placeholder="" ng-keyup="index();"/></td>
	      <td><input type="text" ng-model="userFilter.name" placeholder="" ng-keyup="index();"/></td>
	      <td><input type="number" ng-model="userFilter.age" placeholder="" ng-keyup="index();"/></td>
	    

	      <td>
		  <select ng-model="userFilter.active" ng-Change="index();">
		      <option value="" SELECTED>all</option>
		      <option value="true">true</option>
		      <option value="false">false</option>
		  </select>
		  
	      </td>
	  </form>
     </tr>

```

###2:Update index method in the API factory like below

<br/>
source:API/API.js

<br/>
code:
```javascript
  
  index: function (model, $scope) {
           
	 
	    $scope.filter = {};
	    
            /* Remove empty fields */
            for (var field in $scope.userFilter) {
                
	        if ($scope.userFilter[field]) {
		  
                    $scope.filter[field] = {startsWith: $scope.userFilter[field]};
                }
            }
            
            var url = host + model + "/index";
            var data = {
                 page: $scope.currentPage,
                limit: $scope.items_per_page,
                 sort: $scope.sortField,
                order: $scope.reverse,
	       filter: $scope.filter
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