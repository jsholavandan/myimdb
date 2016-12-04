namespace myimdb.Controllers {

    export class AccountController{
      public userCredentials;
      public user;

      public closeDialog(){
        this.$uibModalInstance.close();
      }

      public loginUser(){
        this.accountService.login(this.userCredentials).then((res) => {
          this.setToken(res);
          this.$rootScope.currentUser = this.isLoggedIn();
          this.$rootScope.username = this.userCredentials.username;
          this.$state.go('home');
          console.log(res);
        }).catch((err) =>{
          console.log(err);
        });
        this.closeDialog();
      }

      public setToken(data){
        this.$window.localStorage.setItem("token", JSON.stringify(data.token));
      }

      public getToken(){
          return this.$window.localStorage.getItem('token');
      }

      public isLoggedIn(){
        let token = this.getToken();
        if(token){
          let payLoad = JSON.parse(this.$window.atob(token.split('.')[1]));
          return payLoad;
        }else{
          return false;
        }
      }

      public registerUser(){
      //  console.log(this.user);
        this.accountService.signUp(this.user).then((data) => {
          this.$state.go('login');
          console.log(data)
      //  this.Flash.create('success', "registered" );
        }).catch((err) => {
          //  this.Flash.create('danger', 'Error occured. Please try again.');
          console.log(err);
        });
        this.closeDialog();
      }

      constructor(private $uibModalInstance:angular.ui.bootstrap.IModalServiceInstance,
                  private accountService: myimdb.Services.AccountService,
                  private $state:ng.ui.IStateService,
                  private Flash,
                  private $window: ng.IWindowService,
                  private $rootScope:ng.IRootScopeService){

      }
    }

    angular.module("myimdb").controller("AccountController", AccountController);
}
