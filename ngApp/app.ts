namespace myimdb {

    angular.module('myimdb', ['angularjs-dropdown-multiselect','ngFlash','ngPassword','ngAnimate','ui.router', 'ngResource', 'ngMaterial', 'ngMessages', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller:myimdb.Controllers.HomeController,
                controllerAs: 'controller'
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
            })
            .state('admin.listMovies', {
              url: '/listMovies',
              templateUrl: '/ngApp/views/admin.listMovies.html',
              controller: myimdb.Controllers.MoviesController,
              controllerAs: 'controller'
            })
            .state('admin.addMovie', {
              url: '/addMovies',
              templateUrl: '/ngApp/views/admin.addMovie.html',
              controller: myimdb.Controllers.AddMovieController,
              controllerAs: 'controller'
            })
            .state('admin.editMovie', {
              url:'/editMovie/:id',
              templateUrl:'/ngApp/views/admin.editMovie.html',
              controller: myimdb.Controllers.EditMovieController,
              controllerAs: 'controller'
            })
            .state('admin.listActors',{
              url:'/listActors',
              templateUrl:'/ngApp/views/admin.listActors.html',
              controller:myimdb.Controllers.ActorController,
              controllerAs: 'controller'
            })
            .state('admin.addActor', {
              url:'/addActors',
              templateUrl:'/ngApp/views/admin.addActor.html',
              controller:myimdb.Controllers.AddActorController,
              controllerAs: 'controller'
            })
            .state('admin.editActor', {
              url:'/editActor/:id',
              templateUrl: '/ngApp/views/admin.editActor.html',
              controller: myimdb.Controllers.EditActorController,
              controllerAs: 'controller'
            })
            .state('displayMovie', {
              url:'/displayMovie/:id',
              templateUrl:'/ngApp/views/mainMovieDisplay.html',
              controller: myimdb.Controllers.DisplayMovieController,
              controllerAs: 'controller'
            })
            .state('displayMovie.displayDetails', {
              url:'/displayDetails',
              templateUrl: '/ngApp/views/displayDetails.html',
              controller: myimdb.Controllers.MovieDetailsController,
              controllerAs: 'controller',
              params:{
                'movieObj': null
              }
            })
            .state('displayMovie.displayCast', {
              url:"/displayCast",
              templateUrl:'/ngApp/views/displayCast.html',
              controller: myimdb.Controllers.DisplayCastController,
              controllerAs: 'controller',
              params: {
                'movieObj' : null
              }
            })
            .state('displayMovie.displayReviews', {
              url:'/displayReviews',
              templateUrl:'/ngApp/views/displayReviews.html',
              controller: myimdb.Controllers.DisplayReviewsController,
              controllerAs: 'controller',
              params:{
                'movieObj' : null
              }
            })
            .state('searchResults', {
              url:'/searchResults/:txt',
              templateUrl:'/ngApp/views/searchResults.html',
              controller: myimdb.Controllers.SearchMoviesController,
              controllerAs: 'controller'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/home');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
