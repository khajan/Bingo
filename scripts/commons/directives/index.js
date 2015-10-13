/**
	@file index.js
	@module bingo.commons.directives
	@description
		This is the main module of bingo common model.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular",
	"bingo/scripts/commons/directives/validation",
	"bingo/scripts/commons/directives/model"
], function(angular){
	return angular.module("bingo.commons.directives",[
			"bingo.commons.directives.validation",
			"bingo.commons.directives.model"
		]
	);
});
