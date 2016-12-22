namespace myimdb.Controllers{

  export class HomeController{
    public username;
    public movies;

    public checkRatings(){
      for(let i=0;i<this.movies.length;i++){
        console.log(this.movies[i].rating.length);
        if(this.movies[i].rating.length > 0){
          let val = this.movies[i].rating.reduce((acc, cur) => acc + cur, 0);
          this.movies[i].rate = Math.floor(val/this.movies[i].rating.length);
          //console.log(val);
        }else{
          this.movies[i].rate = 0;
        }
      }
    //  console.log(this.movies);
    }



    constructor(private $rootScope:ng.IRootScopeService,
                private cinemasService: myimdb.Services.CinemasService){
      this.$rootScope.$on("userLoggedIn", () => {
        this.username = this.$rootScope.username;
      });
      this.cinemasService.listCinemas().$promise.then((cinemas) => {
        this.movies = cinemas;
        this.checkRatings();
      });
    }
  }
  angular.module("myimdb").controller("HomeController", HomeController);

}
