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

        /** @ngInject */
        function RouteController(routeService) {
            var vm = this;

            vm.points = routeService;
            vm.drag = function ($event, point) {
                console.log(1)
            };
            vm.open = function ($event, point) {
                var geoObject = $event.get('target');
                geoObject.properties
                    .set({
                        balloonContentHeader: point.title,
                        balloonContentBody: geoObject.geometry.getCoordinates()
                    });
            };
            vm.setting = {
                draggable: true,
                preset: 'islands#circleIcon',
                iconColor: '#3caa3c',
                openEmptyBalloon: true
            };
        }
    }
})();