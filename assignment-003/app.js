(
    function() {
        'use strict';

        angular.module('NarrotItDownApp', [])
            .controller('NarrowItDownController', NarrowItDownController)
            .service('MenuSearchService', MenuSearchService)
            .constant('ApiBaseUrl', "https://davids-restaurant.herokuapp.com/menu_items.json")
            .directive('foundItem', foundItem);


        function foundItem() {
            var ddo = {
                templateUrl: 'item.html',
                scope: {
                    foundItems: '<',
                    myTitle: '@title',
                    onRemove: '&',
                },
                controller: MenuItemsDirectiveController,
                controllerAs: 'menu',
                bindToController: true,
            };

            return ddo;
        }

        function MenuItemsDirectiveController() {
            var menu = this;

        }



        NarrowItDownController.inject = ['MenuSearchService'];

        function NarrowItDownController(MenuSearchService) {

            var narrow = this;

            var searchService = MenuSearchService;


            narrow.found = function() {
                var search = searchService.getMatchedMenuItems(narrow.search);

                search.then(function(response) {
                        console.log("search: ", response);
                        narrow.list = response;

                    })
                    .catch(function(error) {
                        narrow.errorMsg = "No Result";

                       
                    });

            }

            narrow.remove = function(index) {
                console.log("Removing");

                searchService.removeItem(index);
            }


        }

        MenuSearchService.inject = ['$http', 'ApiBaseUrl'];

        function MenuSearchService($http, ApiBaseUrl) {
            var service = this;
            var foundItems = [];

            service.getMatchedMenuItems = function(toSearch) {
                return $http({
                        method: "GET",
                        url: ApiBaseUrl,
                    })
                    .then(function(response) {

                        foundItems = [];
                        var found = response.data.menu_items;

                        for (var i = 0; i < found.length; i++) {
                            if (toSearch === undefined) {
                                // no search
                            } else if (found[i].description.toLowerCase().indexOf(toSearch.toLowerCase()) >= 0) {
                                foundItems.push(found[i]);
                            }

                        }

                        return foundItems;
                    });
            }

            service.removeItem = function(index) {
                foundItems.splice(index, 1);
                if (foundItems.length == 0) {
                 // no item
                }
            }

            service.getSearchList = function() {
                return foundItems;
            }
        }



    }
)();
