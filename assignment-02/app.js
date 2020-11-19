var app = angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.service('ShoppingCheckoutService', ShoppingCheckoutService)




;





 function ToBuyController($scope, ShoppingListCheckOffService) {
	 		$scope.items = ShoppingListCheckOffService.getItems();
			$scope.prepopulated_items = ShoppingListCheckOffService.getPrepopulatedItems();
		ShoppingListCheckOffService.addPrepopulatedItems("eggs",10);
		ShoppingListCheckOffService.addPrepopulatedItems("bacon",11);
	 
	 	ShoppingListCheckOffService.addPrepopulatedItems("Milk",1);
		ShoppingListCheckOffService.addPrepopulatedItems("Water",1);
	 
	 
	 	ShoppingListCheckOffService.addPrepopulatedItems("Cheese",12);
		ShoppingListCheckOffService.addPrepopulatedItems("Ham",1);
	 
		$scope.addItem = function(itemName,quantity){
			//console.log($scope.items)
			ShoppingListCheckOffService.addItem(itemName,quantity);
		}
		
		
		$scope.removePrepopulatedItem = function(index){
			//console.log($scope.items)
			ShoppingListCheckOffService.removePrepopulatedItem(index);
		}
		


}
 
function ShoppingListCheckOffService() {


  var service = this;
 
  // List of shopping items
  var items = [];
  var prepopulated_items = [];
  
  service.addItem = function (itemName, quantity) {
	      console.log("added " +  itemName);
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };
  
    service.addPrepopulatedItems = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    prepopulated_items.push(item);
	
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };
  
    service.removePrepopulatedItem = function (itemIndex) {
    prepopulated_items.splice(itemIndex, 1);
  };

    service.getPrepopulatedItems = function () {
    return prepopulated_items;
  };
  
  service.getItems = function () {
    return items;
  };
  
}
 
 
 
 
 function AlreadyBoughtController($scope, ShoppingCheckoutService,ShoppingListCheckOffService) {
	
		$scope.checkoutlist =ShoppingListCheckOffService.getItems();
		
		
			$scope.remove = function(itemIndex){
				var toRemove = $scope.checkoutlist[itemIndex];
				ShoppingListCheckOffService.getItems().splice(itemIndex, 1);
				ShoppingListCheckOffService.addPrepopulatedItems(toRemove.name,toRemove.quantity);
	 
			}

}


		function ShoppingCheckoutService() {
		  var service = this;
	
	
		}

		
		
		