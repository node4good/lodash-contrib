module.exports = function (_) {

  // Helpers
  // -------

  // No reason to create regex more than once
  var REGEX = {
      boundary: /(\b.)/g,
      bracket: /(?:([^\[]+))|(?:\[(.*?)\])/g,
      capitalLetters: /([A-Z])/g,
      dot: /\./g,
      htmlTags: /<\/?[^<>]*>/gi,
      lowerThenUpper: /([a-z])([A-Z])/g,
      nonCamelCase: /[-_\s](\w)/g,
      plus: /\+/g,
      regex: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      space: / /g,
      underscore: /_/g,
      upperThenLower: /\b([A-Z]+)([A-Z])([a-z])/g
  };

  var urlDecode = function (s) {
    return decodeURIComponent(s.replace(REGEX.plus, '%20'));
  };

  var buildParams = function (prefix, val, top) {
    if (_.isUndefined(top)) top = true;
    if (_.isArray(val)) {
      return _.map(val, function (value, key) {
        return buildParams(top ? key : prefix + '[]', value, false);
      }).join('&');
    } else if (_.isObject(val)) {
      return _.map(val, function (value, key) {
        return buildParams(top ? key : prefix + '[' + key + ']', value, false);
      }).join('&');
    } else {
      return encodeURIComponent(prefix) + '=' + encodeURIComponent(val);
    }
  };

  // Mixing in the string utils
  // ----------------------------

  _.mixin({
    // Explodes a string into an array of chars
    explode: function (s) {
      return s.split('');
    },

    // Parses a query string into a hash
    fromQuery: function (str) {
      var parameters = str.split('&'),
        obj = {},
        parameter,
        key,
        match,
        lastKey,
        subKey,
        depth;

      // Iterate over key/value pairs
      _.each(parameters, function (parameter) {
        parameter = parameter.split('=');
        key = urlDecode(parameter[0]);
        lastKey = key;
        depth = obj;

        // Reset so we don't have issues when matching the same string
        REGEX.bracket.lastIndex = 0;

        // Attempt to extract nested values
        while ((match = REGEX.bracket.exec(key)) !== null) {
          if (!_.isUndefined(match[1])) {

            // If we're at the top nested level, no new object needed
            subKey = match[1];

          } else {

            // If we're at a lower nested level, we need to step down, and make
            // sure that there is an object to place the value into
            subKey = match[2];
            depth[lastKey] = depth[lastKey] || (subKey ? {} : []);
            depth = depth[lastKey];
          }

          // Save the correct key as a hash or an array
          lastKey = subKey || _.size(depth);
        }

        // Assign value to nested object
        depth[lastKey] = urlDecode(parameter[1]);
      });

      return obj;
    },

    // Implodes and array of chars into a string
    implode: function (a) {
      return a.join('');
    },

    // Converts camel case to dashed (opposite of _.camelCase)
    toDash: function (string) {
      string = string.replace(REGEX.capitalLetters, function ($1) {return "-" + $1.toLowerCase();});
      // remove first dash
      return  ( string.charAt(0) == '-' ) ? string.substr(1) : string;
    },

    // Creates a query string from a hash
    toQuery: function (obj) {
      return buildParams('', obj);
    },

    // Reports whether a string contains a search string.
    strContains: function (str, search) {
      if (typeof str != 'string') throw new TypeError( 'First argument to strContains must be a string' );
      return (str.indexOf(search) != -1);
    },

    // Upper case first letter in every word.
    titleCase: function capitalize(string) {
      return string.replace(REGEX.boundary, function ($1) {return $1.toUpperCase();});
    },

    // Slugify a string. Makes lowercase, and converts dots and spaces to dashes.
    slugify: function (urlString) {
      return urlString.replace(REGEX.lowerThenUpper, '$1-$2')
                      .replace(REGEX.space, '-')
                      .replace(REGEX.dot, '-')
                      .toLowerCase();
    },

    // Humanize a slug by adding spaces in place of underscores and between words
    humanize: function (slugish) {
      return _.capitalize(slugish
          // Replace _ with a space
          .replace(REGEX.underscore, ' ')
          // insert a space between lower & upper
          .replace(REGEX.lowerThenUpper, '$1 $2')
          // space before last upper in a sequence followed by lower
          .replace(REGEX.upperThenLower, '$1 $2$3')
      );
    },

    // Strip HTML-ish tags from string
    stripTags: function (suspectString) {
      var str = suspectString.replace(REGEX.htmlTags, '');
      return str;
    }

  });
};
