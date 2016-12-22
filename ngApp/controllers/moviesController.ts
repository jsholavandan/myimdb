namespace myimdb.Controllers {

  export class MoviesController{
    public movies;

    public addMovie(){
        this.$state.go("admin.addMovie");
    }

  /*  public showMovie(movieId){
      this.$state.go("admin.displayMovie",{id:movieId});
    } */

    public deleteMovie(id){
      this.$uibModal.open({
        templateUrl: '/ngApp/views/deleteMovie.html',
        controller: myimdb.Controllers.DeleteMovieController,
        controllerAs: "controller",
        resolve: {
          movieId : () => id
        },
        size: 'sm'
      }).result.then((res) => {
        if(res !== undefined){
          this.cinemasService.removeCinema(res).then((data) => {
            this.movies = this.cinemasService.listCinemas();
          }).catch((err) => {
            console.log(err);
            this.Flash.create("danger", "Error occured. Please try again.");
          });
        }
      }).catch(() => {
        this.Flash.create("danger", "Error occured. Please try again.");
      });
    }



    constructor(private $state: ng.ui.IStateService,
                private cinemasService: myimdb.Services.CinemasService,
                private $uibModal: angular.ui.bootstrap.IModalService,
                private Flash){
          this.movies = this.cinemasService.listCinemas();
    }
  }

  angular.module("myimdb").controller("MoviesController", MoviesController);

  export class AddMovieController{
    public cinema;
    public actors;
    public selectSettings = {
      displayProp: 'name',
      idProp: '_id'
    };
    public actorsmodel = [];

    public addMovie(){
      this.cinema.rating = [];
      this.cinema.reviews = [];
      this.updateSelectedActors();
    //  console.log(this.cinema);

      this.cinemasService.saveCinema(this.cinema).then((data) => {
          this.Flash.create("success", "Movie added successfully.");
      }).catch((err) =>{
          console.log(err);
          this.Flash.create("danger", "Error occured. Please try again.");
      });
    }

    public updateSelectedActors(){
      this.cinema.actors = [];
      for(let i=0;i<this.actorsmodel.length;i++){
        let actorId = this.actorsmodel[i].id;
        for(let j=0;j<this.actors.length;j++){
          if(actorId === this.actors[j]._id){
            this.cinema.actors.push(this.actors[j]);
          }
        }
      }
    //  console.log(this.cinema.actors);
    }

    public closeFlash(){
      this.$state.go("admin.listMovies");
    }

    constructor(private cinemasService : myimdb.Services.CinemasService,
                private actorsService: myimdb.Services.ActorsService,
                private $state: ng.ui.IStateService,
                private Flash){
      this.actors = this.actorsService.listActors();
    //  console.log(this.actors);
    }
  }
  angular.module("myimdb").controller("AddMovieController", AddMovieController);


  export class EditMovieController{
    public cinema;
    public actors;
    public selectSettings = {
      displayProp: 'name',
      idProp: '_id'
    };
    public actorsmodel = [];

    public selectValues(actorsArr){
      let arr = [];
      for(let i=0;i<actorsArr.length;i++){
        let obj:any = {};
        obj.id = actorsArr[i]._id;
        arr.push(obj);
      }
      this.actorsmodel = arr;
    }

    public cancel(){
      this.$state.go("admin.listMovies");
    }

    public updateSelectedActors(){
      this.cinema.actors = [];
      for(let i=0;i<this.actorsmodel.length;i++){
        let actorId = this.actorsmodel[i].id;
        for(let j=0;j<this.actors.length;j++){
          if(actorId === this.actors[j]._id){
            this.cinema.actors.push(this.actors[j]);
          }
        }
      }
    //  console.log(this.cinema.actors);
    }

    public editMovie(){
      this.updateSelectedActors();
    //  console.log(this.cinema);

      this.cinemasService.saveCinema(this.cinema).then((data) => {
          this.Flash.create("success", "Movie edited successfully.");
      }).catch((err) =>{
          console.log(err);
          this.Flash.create("danger", "Error occured. Please try again.");
      });

    }

    public closeFlash(){
      this.$state.go("admin.listMovies");
    }

    constructor(private cinemasService: myimdb.Services.CinemasService,
                private $stateParams: ng.ui.IStateParamsService,
                private actorsService:myimdb.Services.ActorsService,
                private $state: ng.ui.IStateService,
                private Flash){
      let movieId = this.$stateParams['id'];
      this.cinemasService.getCinema(movieId).$promise.then((cinema) => {
        this.selectValues(cinema.actors);
        this.cinema = cinema;
        this.cinema.releasedate = new Date(cinema.releasedate);
      });
      this.actors = this.actorsService.listActors();
    }
  }

  angular.module("myimdb").controller("EditMovieController", EditMovieController);

  export class DeleteMovieController{
    public movie;

    public closeDialog(){
      this.$uibModalInstance.close();
    }

    public deleteMovie(id){
      this.$uibModalInstance.close(id);
    }


    constructor(public movieId,
                private cinemasService: myimdb.Services.CinemasService,
                private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance){

        this.movie = this.cinemasService.getCinema(movieId);
    }

  }
  angular.module("myimdb").controller("DeleteMovieController", DeleteMovieController);

  export class DisplayMovieController{
    public movie;
    public curNavItem;

    public showMovieDetails(){
    //  console.log("show movie");
      this.curNavItem = "movieDetails";
      this.$state.go('displayMovie.displayDetails',{movieObj:this.movie});
    }

    public showCast(){
    //  console.log("show movie");
      this.curNavItem = "cast";
      this.$state.go('displayMovie.displayCast',{movieObj:this.movie});
    }

    public showReviews(){
    //  console.log("show movie");
      this.curNavItem = "reviews";
      this.$state.go('displayMovie.displayReviews',{movieObj:this.movie});
    }

    constructor(private cinemasService: myimdb.Services.CinemasService,
                private $stateParams: ng.ui.IStateParamsService,
                private $state:ng.ui.IStateService){
       this.movie = this.cinemasService.getCinema(this.$stateParams["id"]);
       this.showMovieDetails();
    }
  }

  angular.module("myimdb").controller("DisplayMovieController", DisplayMovieController);

  export class MovieDetailsController{
    public movie;


    constructor(private $stateParams:ng.ui.IStateParamsService){
      this.movie = $stateParams["movieObj"];
    //  console.log("stateparams");
    //  console.log($stateParams["movieObj"]);
    }
  }
  angular.module("myimdb").controller("MovieDetailsController", MovieDetailsController);

  export class DisplayCastController{
    public movie;

    constructor(private $stateParams:ng.ui.IStateParamsService){
      this.movie = this.$stateParams["movieObj"];
      console.log(this.$stateParams["movieObj"]);
    }

  }
  angular.module("myimdb").controller("DisplayCastController", DisplayCastController);

  export class DisplayReviewsController{
    public overStar;
    public percent;
    public rate = 0;
    public movie;
    public username;
    public reviewObj:any = {};


    public hoveringOver(value) {
      this.overStar = value;
      this.percent = 100 * (value / 5);
    }

    public addReview(){
      if(this.reviewObj.username !== undefined){
        console.log(this.reviewObj.text);
        console.log(this.reviewObj.text !== undefined);
        if((this.reviewObj.text !== "" && this.reviewObj.text !== undefined) || this.rate > 0 ){
          if(this.reviewObj.text !== "" || this.reviewObj.text !== undefined){
            this.movie.reviews.push(this.reviewObj);
          }
          if(this.rate > 0){
            this.movie.rating.push(this.rate);
          }
          this.cinemasService.saveCinema(this.movie).then((data) => {
            this.Flash.create("success", "Review saved.");
          }).catch((err) => {
            this.Flash.create("danger", "Error occured. Try again.");
          });
        }else{
          this.Flash.create("danger","Please fill in the review before submitting.");
        }
      }else{
        this.Flash.create("danger", "Please login to post reviews.");
      }

    }

    constructor(private $stateParams: ng.ui.IStateParamsService,
                private cinemasService: myimdb.Services.CinemasService,
                private $rootScope:ng.IRootScopeService,
                private Flash){

      this.movie = this.$stateParams["movieObj"];
      this.reviewObj.username = this.$rootScope.username;
    }

  }

  angular.module("myimdb").controller("DisplayReviewsController", DisplayReviewsController);

  export class SearchMoviesController{
    public movies;


    constructor(private $stateParams:ng.ui.IStateParamsService,
                private cinemasService: myimdb.Services.CinemasService){
      let searchTxt = this.$stateParams['txt'];
      this.movies = this.cinemasService.searchMovies(searchTxt);
    }
  }
  angular.module("myimdb").controller("SearchMoviesController", SearchMoviesController);
}
