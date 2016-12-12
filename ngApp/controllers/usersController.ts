namespace myimdb.Controllers {

  export class UsersController{
    public users;

    public deleteUser(id){
      this.$uibModal.open({
        templateUrl:'/ngApp/views/dialog.tmpl.html',
        controller:myimdb.Controllers.DeleteUserController,
        controllerAs: "controller",
        resolve: {
          userId: () => id
        },
        size: 'sm'
      }).result.then((res) => {
        console.log(res);
        if(res !== undefined){
          this.usersService.removeUser(res).then((data) => {
            this.users = this.usersService.listUsers();
          }).catch((err) => {
            console.log(err);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }


    constructor(private usersService:myimdb.Services.UsersService,
                private $uibModal:angular.ui.bootstrap.IModalService,
                private $scope:ng.IScope,
                private $rootScope:ng.IRootScopeService,
                private $state:ng.ui.IStateService){

      if(this.$rootScope.currentUser === false || this.$rootScope.role === 'admin'){
        this.$state.go('home');
      }else{
        this.users = this.usersService.listUsers();
      }



    //  console.log(this.users);
    }
  }
  angular.module("myimdb").controller("UsersController", UsersController);


    //Edit controller
    export class EditUserController{
      public user;

      public editUser(){
        console.log(this.user);
        this.usersService.saveUser(this.user).then((data) => {
          console.log(data);
          this.Flash.create('success', 'Edited the user.')
        }).catch((err) => {
          console.log(err);
          this.Flash.create('danger', 'Error occured. Please try again later.')
        });
      }

      public closePage(){
        this.$state.go("admin.listUsers");
      }

      public goToListingsPage(){
        this.$state.go("admin.listUsers");
      }


      constructor(private usersService:myimdb.Services.UsersService,
                  private $stateParams: ng.ui.IStateParamsService,
                  private $state: ng.ui.IStateService,
                  private Flash,
                  private $rootScope: ng.IRootScopeService){
        if(this.$rootScope.currentUser === false || this.$rootScope.role === 'admin'){
          this.$state.go('home');
        }else{
          let id = this.$stateParams["id"];
          this.user = this.usersService.getUser(id);
        }
      }
    }
    angular.module("myimdb").controller("EditUserController", EditUserController);

    export class DeleteUserController{
      public user;

     public closeDialog(){
        this.$uibModalInstance.close();
      }

      public deleteUser(userId){
        this.$uibModalInstance.close(userId)
      }

      constructor(public userId:string,
                  private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
                  private usersService:myimdb.Services.UsersService,
                  private $scope:ng.IScope){
          this.user = this.usersService.getUser(userId);
      }
    }

    angular.module("myimdb").controller("DeleteUserController", DeleteUserController);
}
