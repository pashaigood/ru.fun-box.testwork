(function () {
    'use strict';

    angular
        .module('ruFunBoxTestwork')
        .directive('route', route);

    /** @ngInject */
    function route() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/route/route.html',
            controller: RouteController,
            controllerAs: 'route',
            bindToController: true
        };

        return directive;

        /**
         * @ngInject
         * @param pointsService
         * @constructor
         */
        function RouteController(pointsService) {
            var vm = this;

            vm.points = pointsService;
            /**
             * Обрабатывает событие изменения центра карты.
             * @method
             * @param $event
             */
            vm.onChangeCenter = function($event) {
                pointsService.center = $event.get('newCenter');
            };

            /**
             * Обрабатывает событие перетаскивания точки на карте.
             * @method
             * @param $event
             * @param point
             */
            vm.onDrag = function ($event, point) {
                point.geometry.coordinates = $event.get('target').geometry.getCoordinates();
                pointsService.build();
            };

            /**
             * Обрабатывает событие отображения балуна на карте.
             * @method
             * @param $event
             * @param point
             */
            vm.onShowBalloon = function ($event, point) {
                var geoObject = $event.get('target');
                geoObject.properties
                    .set({
                        balloonContentHeader: point.title,
                        balloonContentBody: geoObject.geometry.getCoordinates()
                    });
            };

            /**
             * Настройки точки на карте.
             * @type {{draggable: boolean, preset: string, iconColor: string, openEmptyBalloon: boolean}}
             */
            vm.pointSetting = {
                draggable: true,
                preset: 'islands#circleIcon',
                iconColor: '#3caa3c',
                openEmptyBalloon: true
            };
        }
    }
})();