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
     * TODO: Изменить на фабрику, и создать в MainController экземпляр, которым и буду пользоваться компонентом.
     * TODO: Изменить название с route на points
     */
    function routeService(_) {
        var route = [];

        /**
         * Текущий центр маршрута.
         * @type {number[]}
         */
        route.center = [37.63261856079043, 55.75561986082598];

        // TODO: Изменить название с lines на route
        route.lines = {
            geometry: {
                type: 'LineString',
                coordinates: []
            }
        };

        /**
         * Метод перестраивает маршрут между точками.
         */
        route.build = function() {
            route.lines.geometry.coordinates = _.map(route, function(point) {
                return point.geometry.coordinates;
            });
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
                    type: "Point"
                }
            });
        }
        route.getPoint = getPoint;

        /**
         * Добавляет точку в маршрут.
         * @param point
         */
        route.add = function (point) {
            point.geometry.coordinates = point.geometry.coordinates || _.clone(route.center);
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
