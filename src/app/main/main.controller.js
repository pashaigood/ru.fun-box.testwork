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

        // Побродим по Ильинскому скверу.
        vm.points.add(vm.points.getPoint({title: 'Точка 1', geometry: {coordinates: [37.6315456771846,55.75716869581239]}}));
        vm.points.add(vm.points.getPoint({title: 'Точка 2', geometry: {coordinates: [37.63520507812404,55.753752974261566]}}));
        vm.points.add(vm.points.getPoint({title: 'Точка 3', geometry: {coordinates: [37.633488464354116,55.753486748594234]}}));
        vm.points.add(vm.points.getPoint({title: 'Точка 4', geometry: {coordinates: [37.630247488020885,55.75655158871031]}}));

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
