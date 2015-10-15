(function() {
    angular
        .module('ruFunBoxTestwork')
        .factory('pointFactory', pointFactory);

    /**
     * Фабрика создаёт новую сущность точки.
     * @ngInject
     * @returns {Function}
     */
    function pointFactory() {

        function Point(data) {
            data = data || {};

            var self = this;

            angular.extend(self, {
                geometry: {
                    type: "Point"
                },
                properties: {}
            });

            if (data.title) {
                self.title(data.title);
                delete  data.title;
            }

            if (data.coords) {
                self.coords(data.coords);
                delete data.coords;
            }
            angular.merge(self, data);
        }

        Point.prototype = {

            /**
             * Получить|установить заголовок.
             * @param [value]
             * @returns {*}
             */
            title: function(value) {
                // Правило, если this не чаще 3 раз
                // или не используеться в другом контексте, не заменяю на self.
                return value ?
                    (this.properties.balloonContentHeader = value)
                    : this.properties.balloonContentHeader;
            },
            /**
             * Получить|установить координаты.
             * @param [value]
             * @returns {*}
             */
            coords: function(value) {
                var self = this;
                if (value) {
                    self.geometry.coordinates = value;
                    self.properties.balloonContentBody = self.toCoords();
                    return value;
                }
                else {
                    return self.geometry.coordinates;
                }
            },

            /**
             * Форматирует внешний вид координат.
             * @method
             * @returns {string}
             */
            toCoords: function () {
                var coords = this.geometry.coordinates;
                return coords[0].toFixed(6) + ', ' + coords[1].toFixed(6);
            }
        };

        /**
         * Метод возвращает новую точку маршрута.
         */
        return function (data) {
            return new Point(data);
        }
    }
})();