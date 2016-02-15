The brass buckles on lodash's utility belt

Basically a [`lodash`](http://lodash.com/) compatible fork of [`underscore-contrib`](https://github.com/documentcloud/underscore-contrib)

lodash-contrib
==============
[![Build Status](https://travis-ci.org/node4good/lodash-contrib.png?branch=master)](https://travis-ci.org/node4good/lodash-contrib)

Links
-----

  * [Documentation](https://github.com/node4good/lodash-contrib/blob/master/docs/index.md)
  * [Source repository](https://github.com/Empeeric/lodash-contrib)
  * [Tickets and bug reports](https://github.com/Empeeric/lodash-contrib/issues?state=open)

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

####Web

First, you’ll need lodash. Then you can grab the relevant lodash-contrib libraries and simply add something like the following to your pages:
```html
<script src="lodash.js"></script>
<script src="lodash.object.builders.js"></script>
```

You could also use [browserify](http://browserify.org/) to bundle your code into a JavaScript file that you can include in a web page.
Require `lodash-contrib` in your main script file (e.g. `test.js`) like so:

```javascript
var _ = require('lodash-contrib');

// YOUR CODE COMES HERE
console.log(_.truthyAll(0, 1, 2, 'lodash-contrib!'));
```

then you could run `browserify test.js -o browserified.js` to get `lodash`, `lodash-contrib` and your code into `browserified.js`.

####Node

Just run `npm install lodash-contrib`, you don't need to have lodash as it will be grabbed as a dependency.

Contributing
------------

**We need some docs sync** since rebasing to version 3 (some methods renamed xxxContrib)

There is still a lot of work to do around perf, documentation, examples, testing and distribution so any help
in those areas is welcomed. Pull requests are accepted, but please search the [issues](https://github.com/empeeric/lodash-contrib/issues)
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
