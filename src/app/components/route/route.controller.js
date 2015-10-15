(function () {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .controller('RouteController', RouteController);

    /**
     * @ngInject
     * @param pointsService
     * @constructor
     */
    function RouteController(pointsService, $log) {
        var vm = this;

        /** @property {Object[]} */
        vm.points = pointsService;

        /**
         * Обрабатывает событие изменения центра карты.
         * @method
         * @param {([Number, Number]|Object)} coords
         */
        vm.changeCenter = function (coords) {
            if (! angular.isArray(coords)) {
                try {
                    coords = coords.get('newCenter');
                }
                catch (e) {
                    $log.error(e);
                    return false;
                }
            }
            pointsService.center = coords;
        };

        /**
         * Обрабатывает событие перетаскивания точки на карте.
         * @method
         * @param {[Number, Number]} coords
         * @param {{}} point
         */
        vm.changePosition = function (coords, point) {
            if (! angular.isArray(coords)) {
                try {
                    coords = coords.get('target').geometry.getCoordinates();
                }
                catch (e) {
                    $log.error(e);
                    return false;
                }
            }

            if (point) {
                point.coords(coords);
                pointsService.build();
            }
            else {
                $log.error(new Error('Point mast be defined.'));
            }
        };


        /**
         * Настройки точки на карте.
         * @type {{draggable: boolean, preset: string, iconColor: string}}
         */
        vm.pointSetting = {
            draggable: true,
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
        };

        /**
         * Настройки линии на карте.
         * @type {{strokeColor: string, strokeWidth: number, strokeOpacity: number}}
         */
        vm.lineSetting = {
            strokeColor: '#000000',
            strokeWidth: 4,
            strokeOpacity: 0.5
        };
    }
})();
