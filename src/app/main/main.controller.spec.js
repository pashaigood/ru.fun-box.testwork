(function () {
    'use strict';

    describe('controller', function () {
        var vm;

        beforeEach(module('ruFunBoxTestwork'));
        beforeEach(inject(function (_$controller_) {
            vm = _$controller_('MainController');
        }));

        it("shouldn't add point without title.", function () {
            var point = vm.newPoint;
            vm.newPoint.title = '';
            vm.add();
            expect(vm.points).not.toContain(vm.newPoint);
            expect(vm.newPoint).toBe(point);
        });

        it('points should be a array.', function() {
            expect(vm.points).toEqual(jasmine.any(Array));
        });

        it("add point. After add, new point shoudn't be equal last point in point's list and origin point in the end of point's list.", function() {
            var point = vm.newPoint,
                length = vm.points.length;

            point.title = 'New point';
            // Добавим новую точку.
            vm.add();
            // Убедимся, что количесто точек увеличелось.
            expect(vm.points.length).toBe(length + 1);
            // Убедимся, что после добавления,
            // оригинальная точка в конце спика,
            // а новая - чистая модель.
            expect(vm.newPoint).not.toBe(point);
            expect(point).toBe(vm.points[length]);
        });
        
        it("remove point. After that, point's list should be shorter and don't contain removed point.", function () {
            // Найдём случайную точку.
            var length = vm.points.length,
                point = vm.points[Math.floor(Math.random() * length)];

            expect(point).toBeDefined();
            // Удалим её из списка точек.
            vm.remove(point);
            // Ожидаем, что её больше нет в списке.
            expect(vm.points).not.toContain(point);
            expect(vm.points.length).toBe(length - 1);
        })
    });
})();
