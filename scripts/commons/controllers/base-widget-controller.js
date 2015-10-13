/**
	@file base-widget-controller.js
	@controller BaseWidgetController
	@description
		This is the base controller which will be used later for inheritance in controllers.
	@author skhajan	
	@date 7/30/2015
*/
"use strict";

define([
	"angular",
	"bingo/scripts/commons/controllers/index",
	"bingo/scripts/commons/controllers/base-controller"
], function(angular, controllers, BaseController){
	controllers.controller("BaseWidgetController", BingoBaseWidgetController);
	BingoBaseWidgetController.$inject = ["$scope", "$attrs", "$element"];
	function BingoBaseWidgetController($scope, $attrs, $element){
		this.$element = $element;
		this.$scope = $scope;
		this.$attrs = $attrs;
		BingoBaseWidgetController.super.apply(this, arguments);
		this.init($scope, $attrs, $element);
	}

	BingoBaseWidgetController.prototype = {
		init: function(scope, attrs, element) {
			scope.widgetId = attrs["id"];
			scope.isRequired = attrs.ngRequired || attrs.required;
			if(attrs.name){
				scope.formName = element.parents("form").data("$formController").$name;
				scope.isFormElement = true;
			}
			if(attrs.label){
				this.$element.wrap("<div class='form-group'></div>");
			}
			this.setupEvents(scope, attrs, element);
		},
		setupEvents: function(scope, attrs, element){
			if(this.setupMouseEvents){
				this.setupMouseEvents(scope, attrs, element);
			}
			if(this.setupKeyboardEvents){
				this.setupKeyboardEvents(scope, attrs, element);
			}
		},
		initNgModel: function (ngModelController) {
			if(this.setValidators){
				this.setValidators(ngModelController);
			}
			if(this.render){
				ngModelController.$render = this.render;
			}
		},
		addAttributes: function(attrs, element, exclusion){
			var exclude = ["$attr", "$$element", "bingoLabel", "bingoValidation", "id"].concat(exclusion||[]);
			exclude.unshift(this.name);
			angular.forEach(attrs, function(value, key){
				if(exclude.indexOf(key) == -1){
					element.attr(attrs.$attr[key], value);
				}
			}, this);
			return element;
		},
		getCaretPosition: function doGetCaretPosition (oField) {
			var iCaretPos = oField[0].selectionStart || 0;
			// IE Support
			if (document.selection) {
				// Set focus on the element
				oField.focus ();
				// To get cursor position, get empty selection range
				var oSel = document.selection.createRange();
				// Move selection start to 0 position
				oSel.moveStart ('character', -oField.value.length);
				// The caret position is selection length
				iCaretPos = oSel.text.length;
			}
			return (iCaretPos);
		},
		/**
		 * The following method takes a validation object and add the to the existing validations array if and only
		 * if the validation does not exists in the array.
		 * @param validation
		 * @return {Array}
		 */
		 addValidation: function(validation){
			var getter = $parse('config.attributes.validations');
			var validations = getter(this) || [];
			var filtered = validations.filter(function(v){ return v.name === validation.name;});
			if(!filtered.length){
				validations.push(validation);
			}
			getter.assign(this, validations);
			return validations;
		},
		/**
		 * The following method takes a validation name and remove it from the existing validations array if and only
		 * if the validation exists.
		 * @param validation
		 * @return {Array}
		 */
		removeValidation: function(validation){
			var getter = $parse('config.attributes.validations');
			var validations = getter(this) || [];
			var filtered = validations.filter(function(v, i){ return v.name === validation.name;});
			if(!filtered.length){
				validations.splice(validations.indexOf(filtered[0]));
			}
			getter.assign(this, validations);
			return validations;
		}

	};

	return BaseController.prototype.successor(BingoBaseWidgetController);
});