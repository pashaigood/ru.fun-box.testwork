(function () {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .controller('MainController', MainController);

    /**
     * Главный контроллер приложения.
     * @param routeService
     * @constructor
     * @ngInject
     */
    function MainController(routeService) {
        var vm = this;

        // TODO: Коодинаты центар карты. Либо из геоданных или центр Москвы.
        vm.points = routeService;
        /** @property {Array} */
        vm.center = [];
        /** @property {Object} */
        vm.newPoint = routeService.getPoint();

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
            routeService.add(vm.newPoint);
            vm.newPoint = routeService.getPoint();
        };

        /**
         * Удаляет точку из списка.
         * @param point
         */
        vm.remove = function (point) {
            routeService.remove(point);
        };

        vm.sortableOptions = {
            containment: '#point-list',
            orderChanged: function() {
                routeService.build();
            }
            /*accept: function (sourceItemHandleScope, destSortableScope) {
                return true;
            },//override to determine drag is allowed or not. default is true.
            itemMoved: function (event) {
            },//Do what you want
            orderChanged: function (event) {
            },//Do what you want
            containment: '#board',//optional param.
            clone: true //optional param for clone feature.*/
        };
    }
})();
