angular.module('ApioDashboardApplication')
.controller('ApioDashboardNewController', ['$scope','objectService','$http','$timeout', function($scope,objectService,$http,$timeout){
	$scope.currentApplication=$scope.$parent.currentApplication;
	$scope.hideWizard=true;
	$scope.hideNewEditor=true;
	$scope.newEditorDisabled=false;
	$scope.wizardDisabled=false;

	$scope.newObject = {};
    $scope.newObject.properties = {};
    $scope.newObject.pins = {};
    $scope.newObject.functions = {};
    $scope.newObject.variables = {};

	$scope.newProperty = {
      name : null,
      type : null
    };
    
    $scope.newPin = {
      name : null,
      number : null,
      type : null
    };

    $scope.getNewObjectId = function(){
    console.log('getNewObjectId running')
    $http.post('/apio/app/maximumId')
        .success(function(data,status,headers){
          console.log("actual maximum Id: "+data);
          $scope.newObject.objectId = (parseInt(data)+1).toString();
        })
        .error(function(){
          console.log("An error has occurred while recovering the actual maximum Id")
        });
 	}

	$scope.showWizard = function(){
	  $scope.hideWizard=false;
	  $scope.hideNewEditor=true;
	  $scope.newEditorDisabled=false;
	  $scope.wizardDisabled=true;
	  $scope.getNewObjectId();
	};

	$scope.showNewEditor = function(){
		$scope.hideNewEditor=false;
	    $scope.hideWizard=true;
	    $scope.hideUpdate=true;
	    $scope.newEditorDisabled=true;
	    $scope.wizardDisabled=false;
	    $scope.hideCreate=true;
	    $scope.hideCreateNew=false;
	    $scope.hideUpdate=true;
	    $scope.initNewEditor();
	   /* $('#inoEditor').trigger('click');
	    $('#jsEditor').trigger('click');
	    $('#htmlEditor').trigger('click');
	    $('#mongoEditor').trigger('click');*/
	};

	$scope.initNewEditor = function(){
		var emptyIno = '#include <INSERT_LIBRARY_NAME.h>\n';
	    emptyIno += 'void setup() {\n}\n';
	    emptyIno += 'void loop(){\n}\n';

	    var emptyHtml = '<div id="ApioApplicationINSERT_ID_APPLICATION" ng-app="ApioApplicationINSERT_ID_APPLICATION"  style="padding:10px;">\n';
	    emptyHtml += '\t<div ng-controller="defaultController">\n';
	    emptyHtml += '\t<topappapplication></topappapplication>\n';
	    emptyHtml += '\t<h2 style="text-align:center;">INSERT_NAME_OBJECT</h2>\n';
	    emptyHtml += '\t<!--INSERT_OBJECT_PROPIERTIES-->\n';
	    emptyHtml += '\t</div>\n';
	    emptyHtml += '</div>\n';
	    emptyHtml += '<script src="applications/INSERT_ID_APPLICATION/INSERT_ID_APPLICATION.js"></script>';

	    var emptyJs = 'var app = angular.module(\'ApioApplicationINSERT_ID_APPLICATION\', [\'apioProperty\'])\n';
	    emptyJs += 'app.controller(\'defaultController\',[\'$scope\', \'currentObject\', function($scope, currentObject){\n';
	    emptyJs += '\tconsole.log("Sono il defaultController e l\'oggetto è")\n';
	    emptyJs += '\tconsole.log(currentObject.get());\n';
	    emptyJs += '\t$scope.object = currentObject.get();\n';
	    emptyJs += '\t$scope.myCustomListener = function() {\n';
	    emptyJs += '\t\t/*INSERT_CUSTOM_LISTENER*/\n';
	    emptyJs += '\t}\n';
	    emptyJs += '}]);\n';
	    emptyJs += 'setTimeout(function(){\n';
	    emptyJs += '\tangular.bootstrap(document.getElementById(\'ApioApplicationINSERT_ID_APPLICATION\'), [\'ApioApplicationINSERT_ID_APPLICATION\']);\n';
	    emptyJs += '},10);';

	    var editorMongo = '{\n';
	    editorMongo += '\t"properties" : {\n';
	    editorMongo += '\t\t"INSERT_NAME1_PROPERTY" : "INSERT_VALUE1_PROPERTY",\n';
	    editorMongo += '\t\t"INSERT_NAME2_PROPERTY" : "INSERT_VALUE2_PROPERTY"\n';
	    editorMongo += '\t},\n';
	    editorMongo += '\t"name" : "INSERT_NAME_OBJECT",\n';
	    editorMongo += '\t"objectId" : "INSERT_ID_OBJECT",\n';
	    editorMongo += '\t"protocol" : "INSERT_PROTOCOL_OBJECT",\n';
	    editorMongo += '\t"address" : "INSERT_ADDRESS_OBJECT",\n';
	    editorMongo += '\t"db" : {\n\t}\n';
	    editorMongo += '}';

	    console.log('editorHtml: ')
	    console.log($scope.editorHtml)
	    console.log('editorJs: ')
	    console.log($scope.editorJs)
	    console.log('editorMongo: ')
	    console.log($scope.editorMongo)

		   	$scope.editorIno.setValue(emptyIno);
		    $scope.editorIno.clearSelection();  
		    $scope.editorIno.blur();
		    $scope.editorHtml.setValue(emptyHtml);  
		    $scope.editorHtml.clearSelection();
		    $scope.editorHtml.blur();
		    $scope.editorJs.setValue(emptyJs); 
		    $scope.editorJs.clearSelection();
		    $scope.editorJs.blur();
		    $scope.editorMongo.setValue(editorMongo);  
		    $scope.editorMongo.clearSelection();
		    $scope.editorMongo.blur();

	    //devo settare anche i valori nello scope perchè altrimenti se viene
	    //premuto update prima che sia stato dato il focus all'editor 
	    //i relativi ng-model rimangono vuoti
	    
	    //$timeout(function(){}, [delay], [invokeApply]);

	    $timeout(function(){
	    	$scope.ino = emptyIno;
	    	$timeout(function(){
			    $scope.html = emptyHtml;
			    $timeout(function(){
			   		$scope.js = emptyJs;
			   		$timeout(function(){
						$scope.mongo = editorMongo;	
					},1,false)
				},1,false)	
			},1,false)
	    },1,false)
	    

	};

	$scope.addNewProperty = function() {
      var t = $scope.newProperty;
      $scope.newObject.properties[$scope.newProperty.name] = t;
      $scope.newProperty = {};
    }
  
    $scope.addNewPin = function() {
      var t = $scope.newPin;
      $scope.newObject.pins[$scope.newPin.name] = t;
      $scope.newPin = {};
    }

    $scope.addNewFunction = function() {
      var t = $scope.newFunction;
      $scope.newObject.functions[$scope.newFunction.text] = t;
      $scope.newFunction = {};
    }
    
    $scope.addNewVariable = function() {
      var t = $scope.newVariable;
      $scope.newObject.variables[$scope.newVariable.name] = t;
      $scope.newVariable = {};
    }

    $scope.newListItem = {
      name : "",
      value : ""
    };

    $scope.addListItemToListProperty = function() {
      console.log($scope);
        if (!$scope.newProperty.hasOwnProperty("items"))
          $scope.newProperty.items = {};
        //l'ho dovuta cambiare per adattarsi alla struttura di matteo 
        //$scope.newProperty.items[$scope.newListItem.name] = $scope.newListItem.value;
        $scope.newProperty.items[$scope.newListItem.value] = $scope.newListItem.name;
        console.log($scope.newProperty.items);
        $scope.newListItem.name = '';
        $scope.newListItem.value = '';
        
      }

    $scope.newTriggeredState = '';

    $scope.removeKeyValue = function(key) {
  			console.log("removeKeyValue() "+key)
  	}

    $scope.generateObjectViewFile = function() {
      var html = '<application objectId="'+$scope.newObject.objectId+'">';
      
      
      for (var k in $scope.newObject.properties) {
        var e = $scope.newObject.properties[k];
        html += "<"+e.type+' model="'+e.name+'" />';
      }
      html += '</application>';
      $scope.view = html;


    }

  	$scope.createNewObject = function() {

  			var keys = ["name","objectId","address","pins","functions","variables","properties","virtual","protocol"];
  			var dao = {};
        dao = angular.copy($scope.newObject);

        console.log("Mi accingo a salvare questo oggetto")
        console.log(dao);
  			$http.post('/apio/database/createNewObject',{object : dao})
		      .success(function(){
		        alert("Virtual Object successfullyCreated");
            $scope.newObject = {};
		        $scope.newObject.properties = {};
		        $scope.newObject.pins = {};
		        $scope.newObject.functions = {};
		        $scope.newObject.variables = {};
		      })
		      .error(function(){
		      	alert("An error has occurred while saving the object")
		      });
  	}
  	
}]);