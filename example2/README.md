##Example2:Using ui-router module  
This example is about how you can use ui-router module to switch between different views.

###1.Install ui-routing module
```
<script src="js/angular-route.min.js"></script>
<script src="js/angular-ui-router.min.js"></script>
```
and update app settings like below:

```javascript

  var app = angular.module('app',['ngRoute','ui.router']);

```

###2.Add ui-view container at index.html
This container will be used to place dynamically switching contents.
```
<body ng-app="app">

    <div ui-view>
   
     </div>

</body> 
```

###3.Add index.html file for user model

source:views/user/index.html

code:
```
<h2>Users</h2> 

```



###4.Add index.html file for city mode

source:views/city/index.html

code:
```
<h2>Cities</h2> 

```

###5.Add router file router.js

source:router.js

```javascript

 app.config(function ($stateProvider, $urlRouterProvider, $routeProvider) {
    
     $urlRouterProvider.otherwise('/user');

    
    $stateProvider.state('users', {
        url: '/user',
        templateUrl: 'views/user/index.html',
        controller: function ($scope, $stateParams) {
           
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

###6.integrate router.js into index.html
code:
```
<body>
</body>
<script src="router.js"></script>

```

Now you will be able to access both views/user/index.htm & views/city/index.html like below

http://localhost/angular/example2/#/user

http://localhost/angular/example2/#/city
