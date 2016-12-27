var myimdb;
(function (myimdb) {
    var Controllers;
    (function (Controllers) {
        var MainController = (function () {
            function MainController($uibModal, $state, $rootScope, $window) {
                this.$uibModal = $uibModal;
                this.$state = $state;
                this.$rootScope = $rootScope;
                this.$window = $window;
                this.$rootScope.currentUser = false;
            }
            MainController.prototype.search = function () {
                this.$state.go('searchResults', { txt: this.searchTxt });
            };
            MainController.prototype.login = function () {
                this.$uibModal.open({
                    templateUrl: "ngApp/views/login.html",
                    controller: myimdb.Controllers.AccountController,
                    controllerAs: 'controller',
                    size: 'sm'
                });
            };
            MainController.prototype.register = function () {
                this.$uibModal.open({
                    templateUrl: 'ngApp/views/register.html',
                    controller: myimdb.Controllers.AccountController,
                    controllerAs: 'controller',
                    size: 'sm'
                });
            };
            MainController.prototype.home = function () {
                this.$state.go('home');
            };
            MainController.prototype.logout = function () {
                this.$rootScope.currentUser = false;
                this.$rootScope.username = null;
                this.$rootScope.role = false;
                this.$window.localStorage.removeItem('token');
                this.$state.go('home');
            };
            MainController.prototype.admin = function () {
                console.log("admin");
                this.$state.go('admin');
            };
            return MainController;
        }());
        Controllers.MainController = MainController;
        angular.module("myimdb").controller("MainController", MainController);
    })(Controllers = myimdb.Controllers || (myimdb.Controllers = {}));
})(myimdb || (myimdb = {}));
