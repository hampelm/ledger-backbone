/*jslint nomen: true */
/*globals define: true */

define([
  // Libraries
  'jquery',
  'lodash',
  'backbone',

  // Project files
  'settings'
],

function($, _, Backbone, settings) {
  'use strict';

  var Grants = {};

  Grants.Model = Backbone.Model.extend({
  });

  Grants.Collection = Backbone.Collection.extend({
    model: Grants.Model,

    initialize: function(options) {
      _.bindAll(this, 'parse', 'url');
      this.org = options.org;
      this.direction = options.direction;

      this.fetch({reset: true});
    },

    url: function() {
      console.log(this.org, this.direction);
      var url = settings.api.baseurl + '/orgs/' + this.org + '/';
      if(this.direction === 'funded') {
        url += "grants_funded.jsonp/?callback=?";
      }
      else if (this.direction === 'received') {
        url += "grants_received.jsonp/?callback=?";
      }
      return url;
    },

    parse: function(response) {
      return _.values(response)[0];
    }
  });

  return Grants;

});


