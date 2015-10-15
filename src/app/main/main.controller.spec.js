(function () {
    'use strict';

    describe('Main controller', function () {
        var pointsService;

        beforeEach(module('ruFunBoxTestwork'));
        beforeEach(inject(function (_$controller_, _pointsService_) {
            _$controller_('MainController');
            pointsService = _pointsService_;
        }));

        it('should create 4 points', function() {
            expect(pointsService.length).toBe(4);
        });

    });
})();
