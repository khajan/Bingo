/**
	@file index.js
	@module bingo
	@description
		This is the main module of bingo components.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular",
	"bingo/scripts/commons/index",
	"bingo/scripts/widgets/index"
], function(angular){
	angular.module("bingo", [
		"bingo.commons",
		"bingo.widgets"
	]);
});
