(function () {
  'use strict';

  angular
    .module('data')
    .controller('CategoriesCtrl', CategoriesCtrl);

  CategoriesCtrl.$inject = ['categoriesList']
  function CategoriesCtrl(categoriesList) {


    var categories = this;
    categories.pageTitle = 'Categories';

    categories.categoriesList = categoriesList;
  }

}());