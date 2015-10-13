/**
 * @file base-model.js
 * @model BaseModel
 * @description
 The following model will be used to manage base
 * @author Khajan.Singh
 * @date 6/27/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/models"
    "bingo/scripts/commons/models/store"
], function (angular, app) {
    app.service("BaseModel", BaseModel);
    BaseModel.$inject = ["DataStore"];
    function BaseModel(DataStore) {
        this.dataStore = DataStore;
        DataStore.constructor.call(this, DataStore.http);
    }

    var concat = String.prototype.concat,
        backslash = "/",
        create = concat.call(backslash, "new"),
        query = "?",
        consName = null;

    BaseModel.prototype = {
        constructor: BaseModel,
        name: null,
        resource: null,
        create: function(data){
            var object = new this.constructor();
            var properties = this.descriptors;
            object.super = this.super;
            object.meta = {};
            object.descriptors = this.descriptors;
            object.resource = this.resource;
            angular.forEach(Object.keys(properties), function(key){
                Object.defineProperty(object, key, properties[key]);
            });
            angular.forEach(data, function(value, key) { this[key] = value; }, object);
            return object;
        },
        extend: function(model, properties){
            var m = model.toString(),
                name = m.substring(m.indexOf(' ')+1, m.indexOf('Model'));
            var cons = null;
            eval("cons = function "+name+"(){"+
                //    "this.super = base.super"+
                //    "this.meta = {}; this.descriptors = base.descriptors;"+
                //    "this.resource = base.resource;"+
                //    //"angular.forEach(Object.keys(properties), function(key){"+
                //    //    "Object.defineProperty(this, key, properties[key]);"+
                //    //"}); " +
                //"angular.forEach(data, function(value, key) { this[key] = value; }, this);"+
            "};");
            //eval("constructor = "+constructor.toString().replace(/name/, name));
            var base = Object.create(BaseModel.prototype, {
                constructor: {
                    value: cons,
                    enumerable: false
                }
            });
            BaseModel.call(base, this.dataStore);
            base.super = BaseModel;
            //base.name = model;
            base.meta = {};
            base.descriptors = properties;
            base.classConstructor = model;
            base.resource = String.prototype.concat(backslash, name.charAt(0).toLowerCase()+name.substring(1), "s");
            //constructor.prototype = base;
            return base;
        },
        all: function(params){
            var self = this, list = [];
            return this.dataStore.get(String.prototype.concat(this.resource, backslash), params).then(
                function(response){
                    angular.forEach(response.data, function(object, index){
                        var item = self.create(object);
                        list.push(item);
                    });
                    return list;
                }
            );
        },
        find: function(params) {
            var url = String.prototype.concat(this.resource, backslash, this.id), self = this;
            if(params && url){
                String.prototype.String.prototype.concat(url, query, $.param(params))
            }
            return this.dataStore.get(url).then(
                function(response){
                    return new self.constructor(response.data);
                }
            );
        },
        post: function(){
            var url = String.prototype.concat(this.resource, create);
            var payload = this;
            return this.dataStore.post(url, payload);
        }
    };

    return BaseModel
});