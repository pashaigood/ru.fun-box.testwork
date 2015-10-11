(function() {
  'use strict';

  angular
    .module('ruFunBoxTestwork')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
