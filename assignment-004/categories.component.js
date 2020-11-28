(function () {
  'use strict';

  angular
    .module('data')
    .component('categoriesList', {
      templateUrl: 'categories.template.html',
      bindings: {
        items: '<'
      }
    });

}());