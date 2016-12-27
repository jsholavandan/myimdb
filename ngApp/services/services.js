var myimdb;
(function (myimdb) {
    var Services;
    (function (Services) {
        var AccountService = (function () {
            function AccountService($resource) {
                this.RegisterResource = $resource('/routes/signup/register');
                this.LoginResource = $resource('/routes/users/login');
            }
            AccountService.prototype.signUp = function (user) {
                return this.RegisterResource.save(user).$promise;
            };
            AccountService.prototype.login = function (userInfo) {
                return this.LoginResource.save(userInfo).$promise;
            };
            return AccountService;
        }());
        Services.AccountService = AccountService;
        angular.module('myimdb').service('accountService', AccountService);
        var UsersService = (function () {
            function UsersService($resource) {
                this.UsersResource = $resource('/routes/users/:id');
            }
            UsersService.prototype.listUsers = function () {
                return this.UsersResource.query();
            };
            UsersService.prototype.getUser = function (id) {
                return this.UsersResource.get({ id: id });
            };
            UsersService.prototype.saveUser = function (user) {
                return this.UsersResource.save({ id: user._id }, user).$promise;
            };
            UsersService.prototype.removeUser = function (userId) {
                return this.UsersResource.remove({ id: userId }).$promise;
            };
            return UsersService;
        }());
        Services.UsersService = UsersService;
        angular.module("myimdb").service("usersService", UsersService);
        var CinemasService = (function () {
            function CinemasService($resource) {
                this.CinemasResource = $resource("/api/cinemas/:id");
                this.SearchResource = $resource("/api/searchMovie");
            }
            CinemasService.prototype.listCinemas = function () {
                return this.CinemasResource.query();
            };
            CinemasService.prototype.getCinema = function (id) {
                return this.CinemasResource.get({ id: id });
            };
            CinemasService.prototype.saveCinema = function (cinema) {
                return this.CinemasResource.save({ id: cinema._id }, cinema).$promise;
            };
            CinemasService.prototype.removeCinema = function (id) {
                return this.CinemasResource.remove({ id: id }).$promise;
            };
            CinemasService.prototype.searchMovies = function (srchTxt) {
                return this.SearchResource.query({ searchTxt: srchTxt });
            };
            return CinemasService;
        }());
        Services.CinemasService = CinemasService;
        angular.module("myimdb").service("cinemasService", CinemasService);
        var ActorsService = (function () {
            function ActorsService($resource) {
                this.ActorsResource = $resource('/api/actors/:id');
            }
            ActorsService.prototype.listActors = function () {
                return this.ActorsResource.query();
            };
            ActorsService.prototype.getActor = function (id) {
                return this.ActorsResource.get({ id: id });
            };
            ActorsService.prototype.saveActor = function (actor) {
                return this.ActorsResource.save({ id: actor._id }, actor).$promise;
            };
            ActorsService.prototype.deleteActor = function (id) {
                return this.ActorsResource.remove({ id: id }).$promise;
            };
            return ActorsService;
        }());
        Services.ActorsService = ActorsService;
        angular.module("myimdb").service("actorsService", ActorsService);
        var ReviewsService = (function () {
            function ReviewsService($resource) {
                this.ReviewsResource = $resource('/api/reviews/:id');
            }
            ReviewsService.prototype.listReviews = function () {
                return this.ReviewsResource.query();
            };
            ReviewsService.prototype.saveReview = function (review) {
                return this.ReviewsResource.save({ id: review._id }, review).$promise;
            };
            ReviewsService.prototype.deleteReview = function (id) {
                return this.ReviewsResource.remove({ id: id }).$promise;
            };
            return ReviewsService;
        }());
        Services.ReviewsService = ReviewsService;
        angular.module("myimdb").service("reviewsService", ReviewsService);
    })(Services = myimdb.Services || (myimdb.Services = {}));
})(myimdb || (myimdb = {}));
