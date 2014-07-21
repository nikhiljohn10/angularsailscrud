##Example12:Adding Date Range filter

###1.Declare $scope.hideDatefilte flag inside the users state in the app router

Note:Which will be used to track the selected records

eg:
```javascript
$scope.hideDatefilter = true;
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
	    
	
	   $scope.hideDatefilter = true;
	   
  
	   $API.index("user",$scope);
        
          }
    })

```
###2:Add Date Range filter Markup at the user grid view


source:views/user/index.html

angularui date picker reference:http://angular-ui.github.io/bootstrap/#/datepicker

<br/>
code:
```html
       <button class="btn btn-default" ng-click="hideDatefilter = !hideDatefilter">Date filter</button>
				  
      <div collapse="hideDatefilter">
      <hr/>
	      <form id="date_filter">
	      From:<input type="text" class="input-sm" starting-day="1"  datepicker-popup="{{format}}" ng-model="dateFilter.from" is-open="from_opened" min-date="minDate" max-date="'2015-06-22'"  datepicker-options="dateOptions"  date-disabled="disabled(date, mode)"  close-text="Close" />
		   
		   <button type="button" class="btn btn-default" ng-click="openDatePicker($event,'from')"><i class="glyphicon glyphicon-calendar"></i></button>
		
		To:<input type="text"  class="input-sm" datepicker-popup="{{format}}" ng-model="dateFilter.to" is-open="to_opened" min-date="minDate" max-date="'2015-06-22'" datepicker-options="dateOptions" date-disabled="disabled(date, mode)"  close-text="Close" />
		   
		   <button type="button" class="btn btn-default" ng-click="openDatePicker($event,'to')"><i class="glyphicon glyphicon-calendar"></i></button>

		<input type="button" class="btn btn-primary" value="GO" ng-click="index()" />
	     </form>  
      </div>

```
###3:Add a openDatePicker function

source:controller/UserController.js

code:

```javascript
 $scope.openDatePicker = function($event,$name) {
         
		$event.preventDefault();
		$event.stopPropagation();
             
	      if($name=="from")
		$scope.from_opened = true;
	      else
		$scope.to_opened = true;
		
     };
```

###4:Update index method in API

Source:API/API.js
<br/>
eg:
```javascript
 for (var field in $scope.dateFilter) {
	     
	      $scope.setDateRange(field);    
		
	   }
```
code:
```javascript
index: function (model, $scope) {
           
	  $scope.filter={};
	  
	   for (var field in $scope.dateFilter) {
	     
	      $scope.setDateRange(field);    
		
	   }
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
                   
		   //alert(angular.toJson(data));
		   
                    $scope.models = data.data;
                    $scope.totalItems = data.totalItems;
                  
                })
                .error(function (data, status, headers, config) {
                  
                });
        }
        

```

###5:Add setDateRange method on the UserController

<br/>
source:controllers/UserController.js

<br/>
code:
```javascript
  
  
        $scope.setDateRange = function(field) {
       
         if(field=="from")
		     {
		         
		        $scope.dateFilter[field].setHours(00,00,00,00);
		     
		        if ($scope.dateFilter['to'])
			{
			
			   $scope.dateFilter['to'].setHours(23,59,59,999);
			     
			   $scope.filter['createdAt'] = {'>=':$scope.dateFilter[field],'<=':$scope.dateFilter['to']}; 
			   
			}
			else
			{
			
		           $scope.filter['createdAt'] = {'>=':$scope.dateFilter[field]};
		
			}
		     }
		     else if(field=="to")
		     {
		  
		        $scope.dateFilter[field].setHours(23,59,59,999);
			
			
		        if ($scope.dateFilter['from'])
			{
			   $scope.dateFilter['from'].setHours(00,00,00,00);
			 
			   $scope.filter['createdAt'] = {'>=':$scope.dateFilter['from'],'<=':$scope.dateFilter[field]}; 
			}
			else
			{
		           $scope.filter['createdAt'] = {'<=':$scope.dateFilter[field]}
			}
		     }
       
    };
    
        
```



