/**
	@file index.js
	@module bingo.widgets
	@description
		This is the main module of bingo directives.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular",
	"bingo/scripts/widgets/html5/index",
	"bingo/scripts/widgets/custom/index"
], function(angular){
	angular.module("bingo.widgets", [
		"bingo.widgets.html5",
		"bingo.widgets.custom"
	]);
});
