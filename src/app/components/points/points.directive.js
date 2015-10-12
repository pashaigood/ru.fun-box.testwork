(function () {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .directive('points', points);

    /**
     * @ngInject
     */
    function points() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/points/points.html',
            controller: 'PointsController',
            controllerAs: 'points',
            bindToController: true
        };
    }
})();