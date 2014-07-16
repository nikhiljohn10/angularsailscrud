##Example3:Add a Bootstrap3.0 navigation bar

###1.Add the below markup at the body like below
```
  <body ng-app="app">
 
           <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		    <div class="container">
			    <div class="navbar-header">
			      
				<a class="navbar-brand" ui-sref="users">AngularJs + SailsJs + Bootstrap3 CRUD</a>
			    </div>
			    
			    <div class="navbar-collapse collapse">
				
				<ul class="nav navbar-nav">
				
				    <li class="active"><a ui-sref="users">Users</a></li>
				    <li><a ui-sref="cities">Cities</a></li>
				
				</ul>
			    </div>
			    <!--/.nav-collapse -->
		    </div>
	     </div>
	 
	    <div ui-view>
            </div>
         
          </body>     
	     
```
reference:http://getbootstrap.com/components/#navbar

###2.Add Menu Controller 
This controller can be used to find which menu item is active.

source:controllers/MenuController.js

code:
```javascript

              function MenuCtrl($scope,$location) {

		    $scope.isActive = function (viewLocation) {
		    
			var active = (viewLocation === $location.path());
                             return active;
		    };
	       }
	       
```
###3:Place the menu markup under MenuController

Note:This enables the access of MenuController member functions in this area.
             eg: Now we can easily access the function isActive() defined @MenuCtrl

code:
```
  <body ng-app="app">
 
           <div ng-controller="MenuCtrl" class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		    <div class="container">
			    <div class="navbar-header">
			      
				<a class="navbar-brand" ui-sref="users">AngularJs + SailsJs + Bootstrap3 CRUD</a>
			    </div>
			    
			    <div class="navbar-collapse collapse">
				
				<ul class="nav navbar-nav">
				
				    <li ng-class="{ active: isActive('/user') }" ><a ui-sref="users">Users</a></li>
				    <li ng-class="{ active: isActive('/user') }" ><a ui-sref="cities">Cities</a></li>
				
				</ul>
			    </div>
			    <!--/.nav-collapse -->
		    </div>
	     </div>
	 
	    <div ui-view>
            </div>
         
          </body>     
	     
```