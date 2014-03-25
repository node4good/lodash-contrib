// lodash-contrib (lodash.util.strings.js 0.0.1)
// (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors
// lodash-contrib may be freely distributed under the MIT license.

(function (root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('lodash');

  // Helpers
  // -------

  // No reason to create regex more than once
  var plusRegex = /\+/g;

  var urlDecode = function (s) {
    return decodeURIComponent(s.replace(plusRegex, '%20'));
  };

  // Mixing in the string utils
  // ----------------------------

  _.mixin({
    // Explodes a string into an array of chars
    explode: function (s) {
      return s.split('');
    },

    // Parses a query string into a hash
    fromQuery: function(str) {
      var obj = str.split('&').reduce(function (seed, param) {
        var pair = param.split('=');
        var key = urlDecode(pair[0]);
        var val = urlDecode(pair[1]);
        seed[key] = val;
        return seed;
      }, {});
      return obj;
    },

    // Implodes and array of chars into a string
    implode: function (a) {
      return a.join('');
    },

    // Converts a string to camel case
    camelCase: function (string) {
      return  string.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    },

    // Converts camel case to dashed (opposite of _.camelCase)
    toDash: function (string) {
      string = string.replace(/([A-Z])/g, function ($1) {
        return "-" + $1.toLowerCase();
      });
      // remove first dash
      return  ( string.charAt(0) == '-' ) ? string.substr(1) : string;
    },

    // Creates a query string from a hash
    toQuery: function(obj) {
      var parameters = _.map(obj, function (v, k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(v);
      });
      return parameters.join('&');
    },

    // Reports whether a string contains a search string.
    strContains: function (str, search) {
      if (typeof str != 'string') throw new TypeError;
      return (str.indexOf(search) != -1);
    },

    // Reports whether a string contains a search string.
    capitalize: function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    // Slugify a string. Makes lowercase, and converts dots and spaces to dashes.
    slugify: function (urlString) {
      return urlString.replace(/ /g, '-').replace(/\./, '').toLowerCase();
    },

    // Slugify a string. Makes lowercase, and converts dots and spaces to dashes.
    regexEscape: function (regexCandidate) {
      return regexCandidate.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },

    humanize: function (slugish) {
      return slugish
        // Replace _ with a space
        .replace(/_/g, ' ')
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        // uppercase the first character
        .replace(/^./, function(str){ return str.toUpperCase(); });
    },

    stripTags: function (suspectString) {
      var str = suspectString.replace(/<\/?[^<>]*>/gi, '');
      return str;
    }

  });
})(this);
