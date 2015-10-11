(function() {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .service('routeService', routeService);

    /** @ngInject */
    function routeService() {
        var route = [];


        route.build = function() {

        };

        route.getPoint = function() {
            return {
                title: '',
                coordinates: []
            }
        };

        return route;
    }

})();
