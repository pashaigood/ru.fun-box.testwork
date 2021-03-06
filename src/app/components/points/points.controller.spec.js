(function () {
    'use strict';

    describe('controller', function () {
        var vm;

        beforeEach(module('ruFunBoxTestwork'));
        beforeEach(inject(function (_$controller_) {
            _$controller_('MainController')
            vm = _$controller_('PointsController');
        }));

        it("shouldn't add point without title.", function () {
            var point = vm.newPoint;
            vm.newPoint.title('');
            vm.add();
            expect(vm.items).not.toContain(vm.newPoint);
            expect(vm.newPoint).toBe(point);
        });

        it('items should be a array.', function() {
            expect(vm.items).toEqual(jasmine.any(Array));
        });

        it("add point. After add, new point shoudn't be equal last point in point's list and origin point in the end of point's list.", function() {
            var point = vm.newPoint,
                length = vm.items.length;

            point.title('New point');
            // Добавим новую точку.
            vm.add();
            // Убедимся, что количесто точек увеличелось.
            expect(vm.items.length).toBe(length + 1);
            // Убедимся, что после добавления,
            // оригинальная точка в конце спика,
            // а новая - чистая модель.
            expect(vm.newPoint).not.toBe(point);
            expect(point).toBe(vm.items[length]);
        });
        
        it("remove point. After that, point's list should be shorter and don't contain removed point.", function () {
            // Найдём случайную точку.
            var length = vm.items.length,
                point = vm.items[Math.floor(Math.random() * length)];

            expect(point).toBeDefined();
            // Удалим её из списка точек.
            vm.remove(point);
            // Ожидаем, что её больше нет в списке.
            expect(vm.items).not.toContain(point);
            expect(vm.items.length).toBe(length - 1);
        })
    });
})();
