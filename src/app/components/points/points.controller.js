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
    function PointsController(pointsService, $log) {
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
            if ($event && $event.which != 13 || !vm.newPoint.title()) {
                return true;
            }
            if (angular.isDefined(vm.newPoint.coords()) && !angular.isArray(vm.newPoint.coords())) {
                $log.error(new Error('Coordinates must to be an array.'));
                $log.error(vm.newPoint.coords());
                return false;
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
