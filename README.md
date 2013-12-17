lodash-contrib
==================

The brass buckles on lodash's utility belt -- a contributors' library for [lodash](http://lodashjs.org/).

Links
-----

  * [Documentation](http://documentcloud.github.io/lodash-contrib/)
  * [Source repository](https://github.com/documentcloud/lodash-contrib)
  * [Tickets and bug reports](https://github.com/documentcloud/lodash-contrib/issues?state=open)
  * [Maintainer's website](http://www.fogus.me)

Why lodash-contrib?
-----------------------

While lodash provides a bevy of useful tools to support functional programming in JavaScript, it can't
(and shouldn't) be everything to everyone. lodash-contrib is intended as a home for functions that, for
various reasons, don't belong in lodash proper. In particular, it aims to be:

  * a home for functions that are limited in scope, but solve certain point problems, and
  * a proving ground for features that belong in lodash proper, but need some advocacy and/or evolution
(or devolution) to get them there.

Use
---

First, you’ll need lodash. Then you can grab the relevant lodash-contrib libraries and simply add
something
like the following to your pages:

    <script type="text/javascript" src="lodash.js"></script>
    <script type="text/javascript" src="lodash.object.builders.js"></script>

At the moment there are no cross-contrib dependencies (i.e. each library can stand by itself), but that may
change in the future.

Contributing
------------

There is still a lot of work to do around perf, documentation, examples, testing and distribution so any help
in those areas is welcomed. Pull requests are accepted, but please search the [issues](https://github.com/documentcloud/lodash-contrib/issues)
before proposing a new sub-contrib or addition. Additionally, all patches and proposals should have strong
documentation, motivating cases and tests. It would be nice if we could not only provide useful tools built on
lodash, but also provide an educational experience for why and how one might use them.

Other (potentially) useful sub-contribs include the following:

  * String utilities
  * Date/time utilities
  * Validators
  * Iterators
  * Generators
  * Promises
  * Monads
  * Currying
  * Laziness
  * Multimethods

What do these mean? Well, that’s up for discussion. :-)
