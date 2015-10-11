(function() {
  'use strict';

  describe('controller ', function(){
    var vm;

    beforeEach(module('ruFunBoxTestwork'));
    beforeEach(inject(function(_$controller_) {
      vm = _$controller_('MainController');
    }));

    it('should containt a greeting', function() {
      expect(vm.greeting).toBe('it`s work!');
    });
  });
})();
