(function() {
  'use strict';

  angular
    .module('ruFunBoxTestwork')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;

    vm.greeting = 'it`s work!';
  }
})();
