namespace myimdb {

    angular.module('myimdb', ['ngFlash','ngPassword','ngAnimate','ui.router', 'ngResource', 'ngMaterial', 'ngMessages', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: myimdb.Controllers.AccountController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: myimdb.Controllers.AccountController,
                controllerAs: 'controller'
            })
            .state('admin', {
              url:'/admin',
              templateUrl: '/ngApp/views/admin.html',
              controller: myimdb.Controllers.AdminController,
              controllerAs: 'controller'
            })
            .state('admin.listUsers', {
              url:'/listUsers',
              templateUrl:'/ngApp/views/admin.listUsers.html',
              controller: myimdb.Controllers.UsersController,
              controllerAs: 'controller'
            })
            .state('admin.editUser', {
              url: '/editUser/:id',
              templateUrl: '/ngApp/views/admin.editUser.html',
              controller:myimdb.Controllers.EditUserController,
              controllerAs: 'controller'
            });
            /*
            .state('admin.deleteUser', {
              url: '/deleteUser/:id',
              templateUrl:'/ngApp/views/admin.deleteUser.html',
              controller:myimdb.Controllers.DeleteUserController,
              controllerAs: 'controller'
            });  */

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/home');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
