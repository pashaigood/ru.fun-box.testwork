/* global _:true */
(function () {
    'use strict';

    describe('Point', function () {
        var pointsService;

        beforeEach(module('ruFunBoxTestwork'));
        beforeEach(inject(function (_$controller_, _pointsService_) {
            _$controller_('MainController')
            pointsService = _pointsService_;
        }));

        it('should create correctly', function () {
            var mock = {
                    title: 'Тест',
                    coords: [3243.434, 43.34364]
                },
                point = pointsService.getPoint(_.clone(mock));


            expect(point.title()).toBe(mock.title);
            expect(point.coords()).toBe(mock.coords);
            expect(point.geometry.coordinates).toEqual(mock.coords);

        });

        it('should be update.', function () {
            var point = pointsService[0],
                coolds = _.clone(point.coords()),
                title = 'Changed value';

            expect(point.coords()).toBe(point.geometry.coordinates);
            // При открытии балуна, данные для отрисовки должны обновиться.
            point.title(title);
            coolds[0] += 1;
            coolds[1] += 10;
            point.coords(coolds);

            expect(point.properties.balloonContentHeader).toBe(point.title());
            expect(point.geometry.coordinates).toEqual(coolds);
        });

        it('\'s lines should be rebuild.', function () {
            // Изменим порядок точек.
            var point = pointsService[0];
            pointsService.remove(point);
            pointsService.add(point);
            pointsService.add(pointsService.getPoint());

            // Ожидаем, что координаты линии буду в том же порядке.
            var newOrder = _.map(pointsService, function (point) {
                var coords = point.geometry.coordinates;
                expect(coords).toEqual(jasmine.any(Array));
                expect(coords.length).toBe(2);
                return coords;
            });

            expect(newOrder).toEqual(pointsService.lines.geometry.coordinates);
        });

    });
})();
