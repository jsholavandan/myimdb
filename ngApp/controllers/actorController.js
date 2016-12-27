var myimdb;
(function (myimdb) {
    var Controllers;
    (function (Controllers) {
        var ActorController = (function () {
            function ActorController($state, actorsService, $uibModal) {
                this.$state = $state;
                this.actorsService = actorsService;
                this.$uibModal = $uibModal;
                this.actors = actorsService.listActors();
            }
            ActorController.prototype.addActor = function () {
                this.$state.go("admin.addActor");
            };
            ActorController.prototype.deleteActor = function (id) {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/deleteActor.html',
                    controller: myimdb.Controllers.DeleteActorController,
                    controllerAs: 'controller',
                    resolve: {
                        actorId: function () { return id; }
                    },
                    size: 'sm'
                }).result.then(function (res) {
                    if (res !== undefined) {
                        _this.actorsService.deleteActor(res).then(function (data) {
                            console.log("data");
                            _this.actors = _this.actorsService.listActors();
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            };
            return ActorController;
        }());
        Controllers.ActorController = ActorController;
        angular.module("myimdb").controller("ActorController", ActorController);
        var AddActorController = (function () {
            function AddActorController(actorsService, $state, Flash) {
                this.actorsService = actorsService;
                this.$state = $state;
                this.Flash = Flash;
            }
            AddActorController.prototype.addActor = function () {
                var _this = this;
                this.actorsService.saveActor(this.actor).then(function () {
                    _this.Flash.create("success", "Actor created.");
                }).catch(function (err) {
                    _this.Flash.create("danger", "Error occured. Please try again.");
                });
            };
            AddActorController.prototype.closeDialog = function () {
                this.$state.go("admin.listActors");
            };
            return AddActorController;
        }());
        Controllers.AddActorController = AddActorController;
        angular.module("myimdb").controller("AddActorController", AddActorController);
        var EditActorController = (function () {
            function EditActorController($state, actorsService, $stateParams, Flash) {
                this.$state = $state;
                this.actorsService = actorsService;
                this.$stateParams = $stateParams;
                this.Flash = Flash;
                var actorId = this.$stateParams["id"];
                this.actor = this.actorsService.getActor(actorId);
            }
            EditActorController.prototype.goToListingsPage = function () {
                this.$state.go("admin.listActors");
            };
            EditActorController.prototype.editActor = function () {
                var _this = this;
                this.actorsService.saveActor(this.actor).then(function (data) {
                    _this.Flash.create("success", "Actor edited.");
                }).catch(function (err) {
                    _this.Flash.create("danger", "Error occured. Please try again.");
                });
            };
            return EditActorController;
        }());
        Controllers.EditActorController = EditActorController;
        angular.module("myimdb").controller("EditActorController", EditActorController);
        var DeleteActorController = (function () {
            function DeleteActorController(actorId, actorsService, $uibModalInstance) {
                this.actorId = actorId;
                this.actorsService = actorsService;
                this.$uibModalInstance = $uibModalInstance;
                this.actor = this.actorsService.getActor(actorId);
            }
            DeleteActorController.prototype.closeDialog = function () {
                this.$uibModalInstance.close();
            };
            DeleteActorController.prototype.deleteActor = function (id) {
                this.$uibModalInstance.close(id);
            };
            return DeleteActorController;
        }());
        Controllers.DeleteActorController = DeleteActorController;
        angular.module("myimdb").controller("DeleteActorController", DeleteActorController);
    })(Controllers = myimdb.Controllers || (myimdb.Controllers = {}));
})(myimdb || (myimdb = {}));
