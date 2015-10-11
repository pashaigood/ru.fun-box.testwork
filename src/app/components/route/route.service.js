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
            getPoint({title: 'Точка 1'}),
            getPoint({title: 'Точка 2'}),
            getPoint({title: 'Точка 3'})

        ];

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

            return angular.extend({
                title: '',
                coordinates: []
            }, data);
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
