namespace myimdb.Controllers {

    export class MainController{

      public login(){
        this.$uibModal.open({
          templateUrl:"ngApp/views/login.html",
          controller: myimdb.Controllers.AccountController,
          controllerAs: 'controller',
          size:'sm'
        });
      }

      public register(){
        this.$uibModal.open({
          templateUrl:'ngApp/views/register.html',
          controller: myimdb.Controllers.AccountController,
          controllerAs: 'controller',
          size: 'sm'
        });
      }

      public home(){
        this.$state.go('home');
      }

      public logout(){
        this.$rootScope.currentUser = false;
        this.$rootScope.username = null;
        this.$window.localStorage.removeItem('token');
        this.$state.go('home');
      }

      constructor(private $uibModal:angular.ui.bootstrap.IModalService,
                  private $state:ng.ui.IStateService,
                  private $rootScope: ng.IRootScopeService,
                  private $window: ng.IWindowService){

        this.$rootScope.currentUser = false;

      }
    }

    angular.module("myimdb").controller("MainController", MainController);


}
