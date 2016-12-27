var myimdb;
(function (myimdb) {
    var Controllers;
    (function (Controllers) {
        var UsersController = (function () {
            function UsersController(usersService, $uibModal, $scope, $rootScope, $state) {
                this.usersService = usersService;
                this.$uibModal = $uibModal;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$state = $state;
                if (this.$rootScope.currentUser === false || this.$rootScope.role !== 'admin') {
                    this.$state.go('home');
                }
                else {
                    this.users = this.usersService.listUsers();
                }
            }
            UsersController.prototype.deleteUser = function (id) {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/dialog.tmpl.html',
                    controller: myimdb.Controllers.DeleteUserController,
                    controllerAs: "controller",
                    resolve: {
                        userId: function () { return id; }
                    },
                    size: 'sm'
                }).result.then(function (res) {
                    console.log(res);
                    if (res !== undefined) {
                        _this.usersService.removeUser(res).then(function (data) {
                            _this.users = _this.usersService.listUsers();
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            };
            return UsersController;
        }());
        Controllers.UsersController = UsersController;
        angular.module("myimdb").controller("UsersController", UsersController);
        var EditUserController = (function () {
            function EditUserController(usersService, $stateParams, $state, Flash, $rootScope) {
                this.usersService = usersService;
                this.$stateParams = $stateParams;
                this.$state = $state;
                this.Flash = Flash;
                this.$rootScope = $rootScope;
                if (this.$rootScope.currentUser === false || this.$rootScope.role !== 'admin') {
                    this.$state.go('home');
                }
                else {
                    var id = this.$stateParams["id"];
                    this.user = this.usersService.getUser(id);
                }
            }
            EditUserController.prototype.editUser = function () {
                var _this = this;
                console.log(this.user);
                this.usersService.saveUser(this.user).then(function (data) {
                    console.log(data);
                    _this.Flash.create('success', 'Edited the user.');
                }).catch(function (err) {
                    console.log(err);
                    _this.Flash.create('danger', 'Error occured. Please try again later.');
                });
            };
            EditUserController.prototype.closePage = function () {
                this.$state.go("admin.listUsers");
            };
            EditUserController.prototype.goToListingsPage = function () {
                this.$state.go("admin.listUsers");
            };
            return EditUserController;
        }());
        Controllers.EditUserController = EditUserController;
        angular.module("myimdb").controller("EditUserController", EditUserController);
        var DeleteUserController = (function () {
            function DeleteUserController(userId, $uibModalInstance, usersService, $scope) {
                this.userId = userId;
                this.$uibModalInstance = $uibModalInstance;
                this.usersService = usersService;
                this.$scope = $scope;
                this.user = this.usersService.getUser(userId);
            }
            DeleteUserController.prototype.closeDialog = function () {
                this.$uibModalInstance.close();
            };
            DeleteUserController.prototype.deleteUser = function (userId) {
                this.$uibModalInstance.close(userId);
            };
            return DeleteUserController;
        }());
        Controllers.DeleteUserController = DeleteUserController;
        angular.module("myimdb").controller("DeleteUserController", DeleteUserController);
    })(Controllers = myimdb.Controllers || (myimdb.Controllers = {}));
})(myimdb || (myimdb = {}));
