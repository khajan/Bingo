/**
	@file index.js
	@module bingo.widgets.html5
	@description
		This is the main module of bingo's html5 widgets.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular",
	"bingo/scripts/widgets/html5/directives/label",
	"bingo/scripts/widgets/html5/directives/text",
	"bingo/scripts/widgets/html5/directives/checkbox",
	"bingo/scripts/widgets/html5/directives/number",
	"bingo/scripts/widgets/html5/directives/radio",
	"bingo/scripts/widgets/html5/directives/textarea",
	"bingo/scripts/widgets/html5/directives/time"
], function(angular){
	angular.module("bingo.widgets.html5", [
		"bingo.widgets.html5.label",
		"bingo.widgets.html5.text",
		"bingo.widgets.html5.checkbox",
		"bingo.widgets.html5.number",
		"bingo.widgets.html5.radio",
		"bingo.widgets.html5.textarea",
		"bingo.widgets.html5.time"
	]);
});