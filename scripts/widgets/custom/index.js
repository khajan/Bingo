/**
	@file index.js
	@module bingo.widgets.custom
	@description
		This is the main module of bingo's custom widgets.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular",
	"bingo/scripts/widgets/custom/directives/dropdown",
	"bingo/scripts/widgets/custom/directives/progressbar"
], function(angular){
	angular.module("bingo.widgets.custom", [
		"bingo.widgets.custom.dropdown",
		"bingo.widgets.custom.progressbar"
	]);
});
