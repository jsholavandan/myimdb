var myimdb;
(function (myimdb) {
    var Controllers;
    (function (Controllers) {
        var MoviesController = (function () {
            function MoviesController($state, cinemasService, $uibModal, Flash) {
                this.$state = $state;
                this.cinemasService = cinemasService;
                this.$uibModal = $uibModal;
                this.Flash = Flash;
                this.movies = this.cinemasService.listCinemas();
            }
            MoviesController.prototype.addMovie = function () {
                this.$state.go("admin.addMovie");
            };
            MoviesController.prototype.deleteMovie = function (id) {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/deleteMovie.html',
                    controller: myimdb.Controllers.DeleteMovieController,
                    controllerAs: "controller",
                    resolve: {
                        movieId: function () { return id; }
                    },
                    size: 'sm'
                }).result.then(function (res) {
                    if (res !== undefined) {
                        _this.cinemasService.removeCinema(res).then(function (data) {
                            _this.movies = _this.cinemasService.listCinemas();
                        }).catch(function (err) {
                            console.log(err);
                            _this.Flash.create("danger", "Error occured. Please try again.");
                        });
                    }
                }).catch(function () {
                    _this.Flash.create("danger", "Error occured. Please try again.");
                });
            };
            return MoviesController;
        }());
        Controllers.MoviesController = MoviesController;
        angular.module("myimdb").controller("MoviesController", MoviesController);
        var AddMovieController = (function () {
            function AddMovieController(cinemasService, actorsService, $state, Flash) {
                this.cinemasService = cinemasService;
                this.actorsService = actorsService;
                this.$state = $state;
                this.Flash = Flash;
                this.selectSettings = {
                    scrollableHeight: '120px',
                    displayProp: 'name',
                    idProp: '_id',
                    scrollable: true
                };
                this.actorsmodel = [];
                this.actors = this.actorsService.listActors();
            }
            AddMovieController.prototype.addMovie = function () {
                var _this = this;
                this.cinema.rating = [];
                this.cinema.reviews = [];
                this.updateSelectedActors();
                this.cinemasService.saveCinema(this.cinema).then(function (data) {
                    _this.Flash.create("success", "Movie added successfully.");
                }).catch(function (err) {
                    console.log(err);
                    _this.Flash.create("danger", "Error occured. Please try again.");
                });
            };
            AddMovieController.prototype.updateSelectedActors = function () {
                this.cinema.actors = [];
                for (var i = 0; i < this.actorsmodel.length; i++) {
                    var actorId = this.actorsmodel[i].id;
                    for (var j = 0; j < this.actors.length; j++) {
                        if (actorId === this.actors[j]._id) {
                            this.cinema.actors.push(this.actors[j]);
                        }
                    }
                }
            };
            AddMovieController.prototype.closeFlash = function () {
                this.$state.go("admin.listMovies");
            };
            return AddMovieController;
        }());
        Controllers.AddMovieController = AddMovieController;
        angular.module("myimdb").controller("AddMovieController", AddMovieController);
        var EditMovieController = (function () {
            function EditMovieController(cinemasService, $stateParams, actorsService, $state, Flash) {
                var _this = this;
                this.cinemasService = cinemasService;
                this.$stateParams = $stateParams;
                this.actorsService = actorsService;
                this.$state = $state;
                this.Flash = Flash;
                this.selectSettings = {
                    scrollableHeight: '120px',
                    displayProp: 'name',
                    idProp: '_id',
                    scrollable: true
                };
                this.actorsmodel = [];
                var movieId = this.$stateParams['id'];
                this.cinemasService.getCinema(movieId).$promise.then(function (cinema) {
                    _this.selectValues(cinema.actors);
                    _this.cinema = cinema;
                    _this.cinema.releasedate = new Date(cinema.releasedate);
                });
                this.actors = this.actorsService.listActors();
            }
            EditMovieController.prototype.selectValues = function (actorsArr) {
                var arr = [];
                for (var i = 0; i < actorsArr.length; i++) {
                    var obj = {};
                    obj.id = actorsArr[i]._id;
                    arr.push(obj);
                }
                this.actorsmodel = arr;
            };
            EditMovieController.prototype.cancel = function () {
                this.$state.go("admin.listMovies");
            };
            EditMovieController.prototype.updateSelectedActors = function () {
                this.cinema.actors = [];
                for (var i = 0; i < this.actorsmodel.length; i++) {
                    var actorId = this.actorsmodel[i].id;
                    for (var j = 0; j < this.actors.length; j++) {
                        if (actorId === this.actors[j]._id) {
                            this.cinema.actors.push(this.actors[j]);
                        }
                    }
                }
            };
            EditMovieController.prototype.editMovie = function () {
                var _this = this;
                this.updateSelectedActors();
                this.cinemasService.saveCinema(this.cinema).then(function (data) {
                    _this.Flash.create("success", "Movie edited successfully.");
                }).catch(function (err) {
                    console.log(err);
                    _this.Flash.create("danger", "Error occured. Please try again.");
                });
            };
            EditMovieController.prototype.closeFlash = function () {
                this.$state.go("admin.listMovies");
            };
            return EditMovieController;
        }());
        Controllers.EditMovieController = EditMovieController;
        angular.module("myimdb").controller("EditMovieController", EditMovieController);
        var DeleteMovieController = (function () {
            function DeleteMovieController(movieId, cinemasService, $uibModalInstance) {
                this.movieId = movieId;
                this.cinemasService = cinemasService;
                this.$uibModalInstance = $uibModalInstance;
                this.movie = this.cinemasService.getCinema(movieId);
            }
            DeleteMovieController.prototype.closeDialog = function () {
                this.$uibModalInstance.close();
            };
            DeleteMovieController.prototype.deleteMovie = function (id) {
                this.$uibModalInstance.close(id);
            };
            return DeleteMovieController;
        }());
        Controllers.DeleteMovieController = DeleteMovieController;
        angular.module("myimdb").controller("DeleteMovieController", DeleteMovieController);
        var DisplayMovieController = (function () {
            function DisplayMovieController(cinemasService, $stateParams, $state) {
                this.cinemasService = cinemasService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.movie = this.cinemasService.getCinema(this.$stateParams["id"]);
                this.showMovieDetails();
            }
            DisplayMovieController.prototype.showMovieDetails = function () {
                this.curNavItem = "movieDetails";
                this.$state.go('displayMovie.displayDetails', { movieObj: this.movie });
            };
            DisplayMovieController.prototype.showCast = function () {
                this.curNavItem = "cast";
                this.$state.go('displayMovie.displayCast', { movieObj: this.movie });
            };
            DisplayMovieController.prototype.showReviews = function () {
                this.curNavItem = "reviews";
                this.$state.go('displayMovie.displayReviews', { movieObj: this.movie });
            };
            return DisplayMovieController;
        }());
        Controllers.DisplayMovieController = DisplayMovieController;
        angular.module("myimdb").controller("DisplayMovieController", DisplayMovieController);
        var MovieDetailsController = (function () {
            function MovieDetailsController($stateParams) {
                this.$stateParams = $stateParams;
                this.movie = $stateParams["movieObj"];
            }
            return MovieDetailsController;
        }());
        Controllers.MovieDetailsController = MovieDetailsController;
        angular.module("myimdb").controller("MovieDetailsController", MovieDetailsController);
        var DisplayCastController = (function () {
            function DisplayCastController($stateParams) {
                this.$stateParams = $stateParams;
                this.movie = this.$stateParams["movieObj"];
                console.log(this.$stateParams["movieObj"]);
            }
            return DisplayCastController;
        }());
        Controllers.DisplayCastController = DisplayCastController;
        angular.module("myimdb").controller("DisplayCastController", DisplayCastController);
        var DisplayReviewsController = (function () {
            function DisplayReviewsController($stateParams, cinemasService, $rootScope, Flash) {
                this.$stateParams = $stateParams;
                this.cinemasService = cinemasService;
                this.$rootScope = $rootScope;
                this.Flash = Flash;
                this.rate = 0;
                this.reviewObj = {};
                this.movie = this.$stateParams["movieObj"];
                this.reviewObj.username = this.$rootScope.username;
            }
            DisplayReviewsController.prototype.hoveringOver = function (value) {
                this.overStar = value;
                this.percent = 100 * (value / 5);
            };
            DisplayReviewsController.prototype.addReview = function () {
                var _this = this;
                if (this.reviewObj.username !== undefined) {
                    console.log(this.reviewObj.text);
                    console.log(this.reviewObj.text !== undefined);
                    if ((this.reviewObj.text !== "" && this.reviewObj.text !== undefined) || this.rate > 0) {
                        if (this.reviewObj.text !== "" || this.reviewObj.text !== undefined) {
                            this.movie.reviews.push(this.reviewObj);
                        }
                        if (this.rate > 0) {
                            this.movie.rating.push(this.rate);
                        }
                        this.cinemasService.saveCinema(this.movie).then(function (data) {
                            _this.Flash.create("success", "Review saved.");
                        }).catch(function (err) {
                            _this.Flash.create("danger", "Error occured. Try again.");
                        });
                    }
                    else {
                        this.Flash.create("danger", "Please fill in the review before submitting.");
                    }
                }
                else {
                    this.Flash.create("danger", "Please login to post reviews.");
                }
            };
            return DisplayReviewsController;
        }());
        Controllers.DisplayReviewsController = DisplayReviewsController;
        angular.module("myimdb").controller("DisplayReviewsController", DisplayReviewsController);
        var SearchMoviesController = (function () {
            function SearchMoviesController($stateParams, cinemasService, Flash) {
                this.$stateParams = $stateParams;
                this.cinemasService = cinemasService;
                this.Flash = Flash;
                var searchTxt = this.$stateParams['txt'];
                this.movies = this.cinemasService.searchMovies(searchTxt);
                if (this.movies.length === 0) {
                    this.Flash.create("danger", " No results found.");
                }
            }
            return SearchMoviesController;
        }());
        Controllers.SearchMoviesController = SearchMoviesController;
        angular.module("myimdb").controller("SearchMoviesController", SearchMoviesController);
    })(Controllers = myimdb.Controllers || (myimdb.Controllers = {}));
})(myimdb || (myimdb = {}));
