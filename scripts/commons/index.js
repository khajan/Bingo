/**
	@file index.js
	@module bingo.commons
	@description
		This is the main module of bingo commons.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular",
	"bingo/scripts/commons/formatters/index",
	"bingo/scripts/commons/parsers/index",
	"bingo/scripts/commons/services/index",
	"bingo/scripts/commons/validators/index",
	"bingo/scripts/commons/controllers/index",
	"bingo/scripts/commons/models/index",
	"bingo/scripts/commons/directives/index"
], function(angular){
	angular.module("bingo.commons", [
		"bingo.commons.formatters",
		"bingo.commons.parsers",
		"bingo.commons.services",
		"bingo.commons.validators",
		"bingo.commons.controllers",
		"bingo.commons.models",
		"bingo.commons.directives"
	]);
});
