module.exports = function(_) {

  // Mixing in the truthiness
  // ------------------------

  _.mixin({
    exists: function(x) { return x != null; },
    truthy: function(x) { return (x !== false) && _.exists(x); },
    falsey: function(x) { return !_.truthy(x); },
    not:    function(b) { return !b; },

    existsAll: function() { return _.every(arguments, _.exists); },
    truthyAll: function() { return _.every(arguments, _.truthy); },
    falseyAll: function() { return _.every(arguments, _.falsey); },
    firstExisting: function() {
      for (var i = 0; i < arguments.length; i++) {
        if (_.exists(arguments[i])) return arguments[i];
      }
    }
  });

};

