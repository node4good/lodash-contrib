// lodash-contrib (lodash.util.existential.js 0.0.1)
// (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors
// lodash-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('lodash');

  // Helpers
  // -------

  function existance(arg) { return arg != null; }

  // Mixing in the truthiness
  // ------------------------

  _.mixin({
    exists: function() {
      return _.every(arguments, existance);
    },
    truthy: function() {
      return _.every(arguments, function(arg) {
        return arg !== false && existance(arg);
      });
    },
    not: function(b) { return !b; },
    firstExisting: function() {
      for (var i = 0; i < arguments.length; i++) {
        if (existance(arguments[i])) return arguments[i];
      }
    }
  });

  _.mixin({
    // needs to be separated to allow reuse of _.truthy
    falsey: function() { 
      return !_.truthy.apply(null, arguments); }
  });

})(this);

