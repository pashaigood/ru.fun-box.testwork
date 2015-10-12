(function () {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .controller('MainController', MainController);

    /**
     * Главный контроллер приложения.
     * @param pointsService
     * @constructor
     * @ngInject
     */
    function MainController(pointsService) {
        //var vm = this;

        // Побродим по Ильинскому скверу.
        pointsService.add(pointsService.getPoint({title: 'Точка 1', geometry: {coordinates: [37.6315456771846,55.75716869581239]}}));
        pointsService.add(pointsService.getPoint({title: 'Точка 2', geometry: {coordinates: [37.63520507812404,55.753752974261566]}}));
        pointsService.add(pointsService.getPoint({title: 'Точка 3', geometry: {coordinates: [37.633488464354116,55.753486748594234]}}));
        pointsService.add(pointsService.getPoint({title: 'Точка 4', geometry: {coordinates: [37.630247488020885,55.75655158871031]}}));

    }
})();
