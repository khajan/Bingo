/**
	@file extension.js
	@service Extension
	@description
		This is the main module of bingo commons extension service.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular"
], function(angular) {
	var Extension = {
		extend: function(ctr, superCons) {

		},
		successor: function (ctor) {
			ctor.super = this.constructor;
			ctor.successor = this.successor;
			var prototype = Object.create(this, {
					constructor: {
						value: ctor,
						enumerable: false
					}
				}
			);
			angular.forEach(ctor.prototype, function(value, key){
				Object.defineProperty(prototype, key, {
					enumerable: false,
					value: value
				});
			});
			ctor.prototype = prototype;
			return ctor;
		}
	};
	return Extension;
});