(function () {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .controller('PointsController', PointsController);

    /**
     * Главный контроллер приложения.
     * @param pointsService
     * @constructor
     * @ngInject
     */
    function PointsController(pointsService) {
        var vm = this;

        // TODO: Коодинаты центар карты. Либо из геоданных или центр Москвы.
        vm.items = pointsService;


        /** @property {Object} */
        vm.newPoint = pointsService.getPoint();

        /**
         * Добаляет новую точку к списку точек.
         * @method
         * @param {Object} [$event] Объект нажатия клавиши.
         * @param {Number} $event.which
         */
        vm.add = function ($event) {
            if (!vm.newPoint.title || $event && $event.which != 13) {
                return true;
            }
            pointsService.add(vm.newPoint);
            vm.newPoint = pointsService.getPoint();
        };

        /**
         * Удаляет точку из списка.
         * @param point
         */
        vm.remove = function (point) {
            pointsService.remove(point);
        };

        vm.sortableOptions = {
            containment: '#point-list',
            orderChanged: function() {
                pointsService.build();
            }
        };
    }
})();
