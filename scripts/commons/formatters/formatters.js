/**
	@file index.js
	@module bingo.commons.formatters
	@description
		This is the main module of bingo common formatters.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular",
	"bingo/scripts/commons/formatters/index"
], function(angular, formattersModule){
	formattersModule.factory("formatters", function (){ return new BingoFormatters();});
	function BingoFormatters(){};
	BingoFormatters.prototype.time = function(first_argument) {
		
	};
	BingoFormatters.prototype.amount = function(first_argument) {
		// body...
	};
	BingoFormatters.prototype.number = function(first_argument) {
		// body...
	};
	BingoFormatters.prototype.date = function(first_argument) {
		// body...
	};
	return BingoFormatters;
});