namespace myimdb.Services {

    export class MovieService {
        private MovieResource;

        public listMovies() {
            return this.MovieResource.query();
        }

        constructor($resource: ng.resource.IResourceService) {
            this.MovieResource = $resource('/api/movies');
        }
    }
    angular.module('myimdb').service('movieService', MovieService);
    export class MyService {

    }
    angular.module('myimdb').service('myService', MyService);
    }
