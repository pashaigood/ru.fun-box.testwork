(function() {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .service('routeService', routeService);

    /**
     * Сервис отвечает за управление маршрутом.
     * @ngInject
     * @constructor
     * @param _
     * @returns {Array}
     */
    function routeService(_) {
        var route = [
            getPoint({title: 'Точка 1', geometry: {coordinates: [37.6315456771846,55.75716869581239]}}),
            getPoint({title: 'Точка 2', geometry: {coordinates: [37.63520507812404,55.753752974261566]}}),
            getPoint({title: 'Точка 3', geometry: {coordinates: [37.633488464354116,55.753486748594234]}}),
        ];

        route.center = [37.63261856079043,55.75561986082598];

        // TODO: Описать перестройку маршрута.
        route.build = function() {
            console.log('time to build');
        };

        /**
         * Метод возвращает новую точку маршрута.
         * @param {Object} [data]
         * @returns {{title: string, coordinates: Array}}
         */
        function getPoint(data) {
            data = data || {};

            return _.defaultsDeep(data, {
                geometry: {
                    type: "Point",
                    coordinates: [37.8, 55.8]
                }
            });
        }
        route.getPoint = getPoint;

        /**
         * Добавляет точку в маршрут.
         * @param point
         */
        route.add = function (point) {
            route.push(point);
            route.build();
        };

        /**
         * Удаляет точку из маршрута.
         * @param point
         */
        route.remove = function(point) {
            _.remove(route, point);
            route.build();
        };

        return route;
    }

})();
