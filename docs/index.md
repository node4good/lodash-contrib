# lodash-contrib

> The brass buckles on lodash's utility belt - a contributors' library for [lodash](http://lodash.com/).

## Introduction

### Places

  * [Documentation](#sub-libraries)
  * [Source repository](https://github.com/empeeric/lodash-contrib)
  * [Tickets and bug reports](https://github.com/empeeric/lodash-contrib/issues?state=open)

### Why lodash-contrib?

While lodash provides a bevy of useful tools to support functional programming in JavaScript, it can't
(and shouldn't) be everything to everyone. lodash-contrib is intended as a home for functions that, for
various reasons, don't belong in lodash proper. In particular, it aims to be:

  * a home for functions that are limited in scope, but solve certain point problems, and
  * a proving ground for features that belong in lodash proper, but need some advocacy and/or evolution
(or devolution) to get them there.

### Use

#### In the Browser

First, you’ll need lodash. Then you can grab the relevant lodash-contrib libraries and simply add
the following to your pages:

```html
    <script type="text/javascript" src="lodash.js"></script>
    <script type="text/javascript" src="lodash.object.builders.js"></script>
```

At the moment there are no cross-contrib dependencies (i.e. each sub-library
can stand by itself), but that may change in the future.

### License

lodash-contrib is open sourced under the [MIT license](https://github.com/Empeeric/lodash-contrib/blob/master/LICENSE).

## Sub-libraries

The lodash-contrib library currently contains a number of related capabilities, aggregated into the following files.

  - [_.array.builders](_.array.builders.js.md#arraybuilders) - functions to build arrays
  - [_.array.selectors](_.array.selectors.js.md#arrayselectors) - functions to take things from arrays
  - [_.collections.walk](_.collections.walk.js.md#collectionswalk) - functions to walk and transform nested JavaScript objects
  - [_.function.arity](_.function.arity.js.md#functionarity) - functions to manipulate and fix function argument arity
  - [_.function.combinators](_.function.combinators.js.md#functioncombinators) - functions to combine functions to make new functions
  - [_.function.iterators](_.function.iterators.js.md#functioniterators) - functions to lazily produce, manipulate and consume sequence iterators
  - [_.function.predicates](_.function.predicates.js.md#functionpredicates) - functions that return `true` or `false` based on some criteria
  - [_.object.builders](_.object.builders.js.md#objectbuilders) - functions to build JavaScript objects
  - [_.object.selectors](_.object.selectors.js.md#objectselectors) - functions to pick things from JavaScript objects
  - [_.util.existential](_.util.existential.js.md#utilexistential) - functions that check for the existence or truthiness of JavaScript data types
  - [_.util.operators](_.util.operators.js.md#utiloperators) - functions that wrap common (or missing) JavaScript operators
  - [_.util.strings](_.util.strings.js.md#utilstrings) - functions to work with strings
  - [_.util.trampolines](_.util.trampolines.js.md#utiltrampolines) - functions to facilitate calling functions recursively without blowing the stack

The links above are to the annotated source code.  Full-blown _.contrib documentation is in the works.  Contributors welcomed.


