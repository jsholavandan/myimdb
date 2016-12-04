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
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/home');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
