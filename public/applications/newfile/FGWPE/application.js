var app = angular.module('ApioApplication_TMP_', ['apioProperty'])
app.controller('defaultController',['$scope', 'currentObject', function($scope, currentObject){
	console.log("Sono il defaultController e l'oggetto è")
	console.log(currentObject.get());
	$scope.object = currentObject.get();
	/**
	* [myCustomListener description]
	* @return {[type]} [description]
	*/
	$scope.myCustomListener = function() {	
	}
}]);

	setTimeout(function(){
		angular.bootstrap(document.getElementById('ApioApplication_TMP_'), ['ApioApplication_TMP_']);
	},10);
