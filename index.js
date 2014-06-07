var inNewContext = require("lodash").runInContext();
inNewContext = (function sandbox(inNewContext) {
    var lodashModule = {}, original_;
    try {
        lodashModule = require.cache[require.resolve("lodash")];
    } catch (e) {
        if (typeof(window) == "undefined")
            window = {};
        if (!window._)
            window._ = require("lodash");
        inNewContext = window._;
    }
    original_ = lodashModule.exports;
    lodashModule.exports = inNewContext;
    require("./_.collections.walk.js");
    require("./_.function.arity.js");
    require("./_.function.combinators.js");
    require("./_.function.dispatch.js");
    require("./_.function.iterators.js");
    require("./_.function.predicates.js");
    require("./_.object.builders.js");
    require("./_.object.selectors.js");
    require("./_.util.existential.js");
    require("./_.util.operators.js");
    require("./_.util.strings.js");
    require("./_.util.trampolines.js");
    lodashModule.exports = original_;
    return inNewContext;
})(inNewContext);
require("./common-js/_.array.builders.js")(inNewContext);
require("./common-js/_.array.selectors.js")(inNewContext);
module.exports = inNewContext;
