(function () {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .directive('route', route);

    /** @ngInject */
    function route() {

        return {
            restrict: 'E',
            templateUrl: 'app/components/route/route.html',
            controller: 'RouteController',
            controllerAs: 'route',
            bindToController: true
        };
    }
})();