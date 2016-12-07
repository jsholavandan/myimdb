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

    export class UsersService{
      public UsersResource;

      public listUsers(){
        return this.UsersResource.query();
      }

      public getUser(id){
        return this.UsersResource.get({id:id});
      }

      public saveUser(user){
        return this.UsersResource.save({id: user._id}, user).$promise;
      }

      public removeUser(userId){
        return this.UsersResource.remove({id:userId}).$promise;
      }

      constructor($resource:ng.resource.IResourceService){
        this.UsersResource = $resource('/routes/users/:id');
      }
    }

    angular.module("myimdb").service("usersService", UsersService);

}
