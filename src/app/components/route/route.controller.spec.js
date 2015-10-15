/* global jasmine:{}, _:{} */
(function () {
    'use strict';

    describe('Route controller', function () {

        var vm,
            pointsService;

        beforeEach(module('ruFunBoxTestwork'));
        beforeEach(inject(function (_$controller_, _pointsService_) {
            _$controller_('MainController')
            vm = _$controller_('RouteController');
            pointsService = _pointsService_;
        }));

        it('should be new position.', function () {
            var coords = [24.4343, 43.545454],
                point = _.last(pointsService);


            // Первый вызов отработае.
            vm.changePosition(coords, point);

            // Будет ошибка.
            vm.changePosition('error', point);
            expect(point.coords()).toEqual(coords);
        });

        it('should be new center.', function () {
            var center = [24.4343, 43.545454];
            vm.changeCenter(center);
            vm.changeCenter('error');
            expect(pointsService.center).toEqual(center);

        });

        it('points should be draggable.', function () {
            expect(vm.pointSetting.draggable).toBe(true);
        });
    });
})();
