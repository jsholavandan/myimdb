namespace myimdb.Controllers {

  export class AdminController{

      public listUsers(){
        this.$state.go('admin.listUsers');
      }

      public listMovies(){
        this.$state.go("admin.listMovies");
      }

      public listActors(){
        this.$state.go("admin.listActors");
      }



    constructor(private $state:ng.ui.IStateService, private $rootScope: ng.IRootScopeService){
      if(this.$rootScope.currentUser === false || this.$rootScope.role === 'admin'){
        this.$state.go('home');
      }

    }
  }

  angular.module("myimdb").controller("AdminController", AdminController);

}
