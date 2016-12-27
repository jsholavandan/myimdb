var myimdb;
(function (myimdb) {
    var Controllers;
    (function (Controllers) {
        var AdminController = (function () {
            function AdminController($state, $rootScope) {
                this.$state = $state;
                this.$rootScope = $rootScope;
                if (this.$rootScope.currentUser === false || this.$rootScope.role !== 'admin') {
                    this.$state.go('home');
                }
            }
            AdminController.prototype.listUsers = function () {
                this.$state.go('admin.listUsers');
            };
            AdminController.prototype.listMovies = function () {
                this.$state.go("admin.listMovies");
            };
            AdminController.prototype.listActors = function () {
                this.$state.go("admin.listActors");
            };
            return AdminController;
        }());
        Controllers.AdminController = AdminController;
        angular.module("myimdb").controller("AdminController", AdminController);
    })(Controllers = myimdb.Controllers || (myimdb.Controllers = {}));
})(myimdb || (myimdb = {}));
