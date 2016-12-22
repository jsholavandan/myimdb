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


    export class CinemasService{
      private CinemasResource;
      private SearchResource;

      public listCinemas(){
        return this.CinemasResource.query();
      }

      public getCinema(id){
        return this.CinemasResource.get({id:id});
      }

      public saveCinema(cinema){
        return this.CinemasResource.save({id:cinema._id}, cinema).$promise;
      }

      public removeCinema(id){
        return this.CinemasResource.remove({id:id}).$promise;
      }

      public searchMovies(srchTxt){
        return this.SearchResource.query({searchTxt:srchTxt});
      }
      constructor($resource:ng.resource.IResourceService){
        this.CinemasResource = $resource("/api/cinemas/:id");
        this.SearchResource = $resource("/api/searchMovie");
      }
    }

    angular.module("myimdb").service("cinemasService", CinemasService);

    export class ActorsService{
      public ActorsResource;

        public listActors(){
            return this.ActorsResource.query();
        }

        public getActor(id){
          return this.ActorsResource.get({id:id});
        }

        public saveActor(actor){
          return this.ActorsResource.save({id:actor._id}, actor).$promise;
        }

        public deleteActor(id){
          return this.ActorsResource.remove({id:id}).$promise;
        }

        constructor($resource: ng.resource.IResourceService){
          this.ActorsResource = $resource('/api/actors/:id');
        }
    }
    angular.module("myimdb").service("actorsService", ActorsService);

    export class ReviewsService{
      private ReviewsResource;

      public listReviews(){
        return this.ReviewsResource.query();
      }

      public saveReview(review){
        return this.ReviewsResource.save({id:review._id}, review).$promise;
      }

      public deleteReview(id){
        return this.ReviewsResource.remove({id:id}).$promise;
      }

      constructor($resource: ng.resource.IResourceService){
        this.ReviewsResource = $resource('/api/reviews/:id');
      }

    }

    angular.module("myimdb").service("reviewsService", ReviewsService);

}
