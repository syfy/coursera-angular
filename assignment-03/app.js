(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('listItem', ListItem)
.directive('listItemDescription', ListItemDescription)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");



function ListItem() {
  var ddo = {
    restrict: "=",
    templateUrl: 'listItem.html'
  };

  return ddo;
}




function ListItemDescription() {
  var ddo = {
    template: '{{ item.name }}'
  };

  return ddo;
}




NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var contents = this;

  var promise = MenuSearchService.getMenuCategories();

  promise.then(function (response) {
    contents.items = response.data.menu_items;
	console.log(response.data);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  contents.logMenuItems = function (shortName) {
    var promise = MenuSearchService.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

}

})();
