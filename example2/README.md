##Example2:Using ui-router module  
This example is about how you can use ui-router module to switch between different views.

###1.Add index.html file for user model

source:views/user/index.html

code:
'''
<h2>Users</h2> 

'''



###2.Add index.html file for city mode

source:views/city/index.html

code:
'''
<h2>Cities</h2> 

'''

###2.Add router file router.js

source:router.js

'''javascript

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

'''
