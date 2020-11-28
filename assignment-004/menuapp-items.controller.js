(function () {
  'use strict';

  angular
    .module('data')
    .controller('ItemsCtrl', ItemsCtrl);

  ItemsCtrl.$inject = ['items', '$stateParams'];
  function ItemsCtrl(items, $stateParams) {

 
    var itemsList = this;
    itemsList.pageTitle = 'categories page';
    itemsList.items = items;
    itemsList.catName = $stateParams.categoryId;

  }

}());