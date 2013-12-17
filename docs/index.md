# lodash-contrib

> The brass buckles on lodash's utility belt - a contributors' library for [lodash](http://lodashjs.org/).

## Introduction

### Places

  * [Documentation](http://documentcloud.github.io/lodash-contrib/)
  * [Source repository](https://github.com/documentcloud/lodash-contrib)
  * [Tickets and bug reports](https://github.com/documentcloud/lodash-contrib/issues?state=open)
  * [Maintainer's website](http://www.fogus.me)

### Why lodash-contrib?

While lodash provides a bevy of useful tools to support functional programming in JavaScript, it can't
(and shouldn't) be everything to everyone. lodash-contrib is intended as a home for functions that, for
various reasons, don't belong in lodash proper. In particular, it aims to be:

  * a home for functions that are limited in scope, but solve certain point problems, and
  * a proving ground for features that belong in lodash proper, but need some advocacy and/or evolution
(or devolution) to get them there.

### Use

First, you’ll need lodash. Then you can grab the relevant lodash-contrib libraries and simply add
something
like the following to your pages:

    <script type="text/javascript" src="lodash.js"></script>
    <script type="text/javascript" src="lodash.object.builders.js"></script>

At the moment there are no cross-contrib dependencies (i.e. each library can stand by itself), but that may
change in the future.

### License

_.contrib is open sourced under the [MIT license](https://github.com/documentcloud/lodash-contrib/blob/master/LICENSE).
## Sub-libraries

The _.contrib library currently contains a number of related capabilities, aggregated into the following files.

  - [lodash.array.builders](docs/lodash.array.builders.html) - functions to build arrays
  - [lodash.array.selectors](docs/lodash.array.selectors.html) - functions to take things from arrays
  - [lodash.collections.walk](docs/lodash.collections.walk.html) - functions to walk and transform nested JavaScript objects
  - [lodash.function.arity](docs/lodash.function.arity.html) - functions to manipulate and fix function argument arity
  - [lodash.function.combinators](docs/lodash.function.combinators.html) - functions to combine functions to make new functions
  - [lodash.function.iterators](docs/lodash.function.iterators.html) - functions to lazily produce, manipulate and consume sequence iterators
  - [lodash.function.predicates](docs/lodash.function.predicates.html) - functions that return `true` or `false` based on some criteria
  - [lodash.object.builders](docs/lodash.object.builders.html) - functions to build JavaScript objects
  - [lodash.object.selectors](docs/lodash.object.selectors.html) - functions to pick things from JavaScript objects
  - [lodash.util.existential](docs/lodash.util.existential.html) - functions that check for the existence or truthiness of JavaScript data types
  - [lodash.util.operators](docs/lodash.util.operators.html) - functions that wrap common (or missing) JavaScript operators
  - [lodash.util.strings](docs/lodash.util.strings.html) - functions to work with strings
  - [lodash.util.trampolines](docs/lodash.util.trampolines.html) - functions to facilitate calling functions recursively without blowing the stack

The links above are to the annotated source code.  Full-blown _.contrib documentation is in the works.  Contributors welcomed.

