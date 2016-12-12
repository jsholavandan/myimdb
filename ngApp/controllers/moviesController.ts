namespace myimdb.Controllers {

  export class MoviesController{
    public movies;

    public addMovie(){
        this.$state.go("admin.addMovie");
    }

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

}
