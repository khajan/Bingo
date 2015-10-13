/**
	@file base-controller.js
	@controller BaseController
	@description
		This is the base controller which will be used later for inheritance in controllers.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular",
	"bingo/scripts/commons/controllers/index",
	"bingo/scripts/commons/services/extension"
], function(angular, controllers, Extension){
	controllers.controller("BaseController", BingoBaseController);
	BingoBaseController.$inject = [];
	function BingoBaseController(){
		//this.injectDependencies($injector, arguments);
	}
	BingoBaseController.prototype.successor = Extension.successor;
	BingoBaseController.prototype.convertIntoDash = function(value){
		return value.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
	};
	BingoBaseController.prototype.injectDependencies = function($injector, args){
		angular.forEach(BingoBaseController.$inject, function(dependency){
			if($injector.has(dependency)){
				args.push(injector.instantiate(dependency));
			}
		});
		return args;
	};
	return BingoBaseController;
});