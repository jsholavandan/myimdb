var myimdb;
(function (myimdb) {
    var Controllers;
    (function (Controllers) {
        var AccountController = (function () {
            function AccountController($uibModalInstance, accountService, $state, Flash, $window, $rootScope) {
                this.$uibModalInstance = $uibModalInstance;
                this.accountService = accountService;
                this.$state = $state;
                this.Flash = Flash;
                this.$window = $window;
                this.$rootScope = $rootScope;
            }
            AccountController.prototype.closeDialog = function () {
                this.$uibModalInstance.close();
            };
            AccountController.prototype.loginUser = function () {
                var _this = this;
                this.accountService.login(this.userCredentials).then(function (res) {
                    _this.setToken(res);
                    _this.$rootScope.currentUser = _this.isLoggedIn();
                    _this.$rootScope.username = _this.userCredentials.username;
                    _this.$rootScope.role = res.role;
                    _this.$rootScope.$broadcast("userLoggedIn");
                    _this.$state.go('home');
                    console.log(res);
                    _this.closeDialog();
                }).catch(function (err) {
                    _this.Flash.create('danger', 'Error occured. Please try again.');
                    console.log(err);
                });
            };
            AccountController.prototype.setToken = function (data) {
                this.$window.localStorage.setItem("token", JSON.stringify(data.token));
            };
            AccountController.prototype.getToken = function () {
                return this.$window.localStorage.getItem('token');
            };
            AccountController.prototype.isLoggedIn = function () {
                var token = this.getToken();
                if (token) {
                    var payLoad = JSON.parse(this.$window.atob(token.split('.')[1]));
                    return payLoad;
                }
                else {
                    return false;
                }
            };
            AccountController.prototype.registerUser = function () {
                var _this = this;
                this.user.role = "user";
                this.accountService.signUp(this.user).then(function (data) {
                    console.log(data);
                    _this.Flash.create('success', "Registered. Please login.");
                }).catch(function (err) {
                    _this.Flash.create('danger', 'Error occured. Please try again.');
                    console.log(err);
                });
            };
            return AccountController;
        }());
        Controllers.AccountController = AccountController;
        angular.module("myimdb").controller("AccountController", AccountController);
    })(Controllers = myimdb.Controllers || (myimdb.Controllers = {}));
})(myimdb || (myimdb = {}));
