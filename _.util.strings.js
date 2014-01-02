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

  // Mixing in the string utils
  // ----------------------------

  _.mixin({
    // Explodes a string into an array of chars
    explode: function (s) {
      return s.split('');
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
    }

  });
})(this);
