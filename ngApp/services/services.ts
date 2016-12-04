namespace myimdb.Services {

    export class AccountService {
      private RegisterResource;
      private LoginResource;

      public signUp(user){
        return this.RegisterResource.save(user).$promise;
      }

      public login(userInfo){
        return this.LoginResource.save(userInfo).$promise;
      }


      constructor($resource:ng.resource.IResourceService){
        this.RegisterResource = $resource('/routes/signup/register');
        this.LoginResource = $resource('/routes/users/login');
      }
    }
    angular.module('myimdb').service('accountService', AccountService);
    }
