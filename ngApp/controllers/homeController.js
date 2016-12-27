var myimdb;
(function (myimdb) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($rootScope, cinemasService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.cinemasService = cinemasService;
                this.$rootScope.$on("userLoggedIn", function () {
                    _this.username = _this.$rootScope.username;
                });
                this.cinemasService.listCinemas().$promise.then(function (cinemas) {
                    _this.movies = cinemas;
                    _this.checkRatings();
                });
            }
            HomeController.prototype.checkRatings = function () {
                for (var i = 0; i < this.movies.length; i++) {
                    console.log(this.movies[i].rating.length);
                    if (this.movies[i].rating.length > 0) {
                        var val = this.movies[i].rating.reduce(function (acc, cur) { return acc + cur; }, 0);
                        this.movies[i].rate = Math.floor(val / this.movies[i].rating.length);
                    }
                    else {
                        this.movies[i].rate = 0;
                    }
                }
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module("myimdb").controller("HomeController", HomeController);
    })(Controllers = myimdb.Controllers || (myimdb.Controllers = {}));
})(myimdb || (myimdb = {}));
