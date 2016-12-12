namespace myimdb.Controllers {

  export class ActorController{
    public actors;


    public addActor(){
      this.$state.go("admin.addActor");
    }

    public deleteActor(id){

      this.$uibModal.open({
        templateUrl: '/ngApp/views/deleteActor.html',
        controller: myimdb.Controllers.DeleteActorController,
        controllerAs: 'controller',
        resolve: {
          actorId: () => id
        },
        size: 'sm'
      }).result.then((res) => {
        if(res !== undefined){
          this.actorsService.deleteActor(res).then((data) => {
            console.log("data");
            this.actors = this.actorsService.listActors();
          }).catch((err) => {
            console.log(err);
          });
        }
      }).catch((err) => {
        console.log(err);
      });

    }

    constructor(private $state:ng.ui.IStateService,
                private actorsService: myimdb.Services.ActorsService,
                private $uibModal:angular.ui.bootstrap.IModalService){
        this.actors = actorsService.listActors();
    }
  }
  angular.module("myimdb").controller("ActorController", ActorController);

  export class AddActorController{
    public actor;

    public addActor(){
      this.actorsService.saveActor(this.actor).then(() => {
        this.Flash.create("success","Actor created.");
      }).catch((err) => {
        this.Flash.create("danger", "Error occured. Please try again.");
      });
    }

    public closeDialog(){
      this.$state.go("admin.listActors");
    }

    constructor(private actorsService: myimdb.Services.ActorsService,
                private $state:ng.ui.IStateService,
                private Flash){

    }
  }

  angular.module("myimdb").controller("AddActorController", AddActorController);

  export class EditActorController{
    public actor;

    public goToListingsPage(){
      this.$state.go("admin.listActors");
    }

    public editActor(){
      this.actorsService.saveActor(this.actor).then((data) => {
        this.Flash.create("success", "Actor edited.");
      }).catch((err) => {
        this.Flash.create("danger", "Error occured. Please try again.");
      });
    }

    constructor(private $state:ng.ui.IStateService,
                private actorsService: myimdb.Services.ActorsService,
                private $stateParams:ng.ui.IStateParamsService,
                private Flash){

      let actorId = this.$stateParams["id"];
      this.actor = this.actorsService.getActor(actorId);
      //console.log(this.actor);
    }
  }
  angular.module("myimdb").controller("EditActorController", EditActorController);

  export class DeleteActorController{
    public actor;

    public closeDialog(){
      this.$uibModalInstance.close();
    }

    public deleteActor(id){
      this.$uibModalInstance.close(id);
    }

    constructor(public actorId,
                private actorsService: myimdb.Services.ActorsService,
                private $uibModalInstance:angular.ui.bootstrap.IModalServiceInstance){
      this.actor = this.actorsService.getActor(actorId);
    }
  }
  angular.module("myimdb").controller("DeleteActorController", DeleteActorController);
}
