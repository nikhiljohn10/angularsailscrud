##Example12:Adding Multiple delete action 

###1.Declare selection variable inside the users state in the app router

Note:Which will be used to track the selected records

eg:
```javascript
$scope.selection = [];
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
	    
	    
	   $API.index("user",$scope);
        
        }
    })

```
###2:Add delete All method in API factory


source:API/API.js

<br/>
code:
```javascript
       deleteAll: function (model, $scope) {
            var url = host + model + "/destroyAll/";
            var data = {
                ids: $scope.selection
            };

            $http({method: 'DELETE',
                url: url,
                params: data
            })
                .success(function (data, status, headers, config) {
                   
                   
                    $scope.index();
		    
		    $("#user_all").attr('checked', false);
 

                })
                .error(function (data, status, headers, config) {
                   
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

```

###3:Add deleteAll method in UserController

<br/>
source:controllers/UserController.js

<br/>
code:
```javascript
  
  
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
        
```

###4:Add a checkbox to each of the record.

<br/>
eg:
code:
```
<td>
      <input id="{{user.id}}" type="checkbox" value="{{user.id}}" ng-checked="selection.indexOf(user.id) > -1" ng-click="toggleSelection(user.id)"/>
</td>

```

Note1: ng-checked directive is used to decide wether its checked/not <br/>
Note2: ng-click directive will call the method toggleSelection in the UserController


###5:Add a select all checkbox on the top row of the grid view.
<br/>
eg:
code:
```
 <td>
    <input id="user_all" type="checkbox" value="" ng-click="selectAll($event)"  />
  </td>

```
Note1: ng-checked directive is used to decide wether its checked/not <br/>
Note2: ng-click directive will call the method selectAll in the UserController



###6:Add toggleSelection method in UserController

The purpose of this function is to push/pop record id's from the selection array when user check/uncheck the records.

<br/>
eg:
code:
```
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

```

###7:Add selectAll method in UserController

The purpose of this function is to push/pop all record id's from the selection array when user check/uncheck checkbox at the top

<br/>
eg:
code:
```
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

```

###8:Add an actions dropDown with delete action at the right top of the grid

source:views/user/index.html

Dropdown reference:http://getbootstrap.com/components/#dropdowns

code:
```
    <div class="btn-group pull-right">
	<button type="button" class="btn btn-primary">Actions</button>

	<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
	    <span class="caret"></span>
	    <span class="sr-only">Toggle Dropdown</span>
	</button>

	<ul class="dropdown-menu" role="menu">
	    <li><a href="" ng-click="deleteAll()">Delete</a></li>
	</ul>
    </div>

```
