(function () {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .service('pointsService', pointsService);

    /**
     * Сервис отвечает за управление маршрутом.
     * @ngInject
     * @constructor
     * @param _
     * @returns {Array}
     * TODO: Изменить на фабрику, и создать в MainController экземпляр, которым и буду пользоваться компонентом.
     * TODO: Изменить название с route на points
     */
    function pointsService(_, pointFactory) {
        var self = [];

        /**
         * Текущий центр маршрута.
         * @type {number[]}
         */
        self.center = [37.63261856079043, 55.75561986082598];

        self.lines = {
            geometry: {
                type: 'LineString',
                coordinates: []
            }
        };

        /**
         * Метод перестраивает маршрут между точками.
         */
        self.build = function() {
            self.lines.geometry.coordinates = _.map(self, function(point) {
                return point.geometry.coordinates;
            });
        };

        /**
         * @method
         */
        self.getPoint = pointFactory;

        /**
         * Добавляет точку в маршрут.
         * @param point
         */
        self.add = function (point) {
            point.coords(point.coords() || _.clone(self.center));
            point.updateAddress();
            self.push(point);
            self.build();
        };

        /**
         * Удаляет точку из маршрута.
         * @param point
         */
        self.remove = function (point) {
            _.remove(self, point);
            self.build();
        };

        return self;
    }


})();
