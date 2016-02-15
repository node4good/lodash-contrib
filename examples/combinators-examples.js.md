Examples for combinator functions
==============================

`_.function.combinators.js` contains functions that allow to build blocks of logic via
the application of smaller functions.

Each section gives use cases showing how a given function could be used.

 * [_.bound](#_boundobj-fname)
 * [_.comparator](#_comparatorfun)
 * [_.complement](#_complementpred)
 * [_.conjoin](#_conjoinpredicates)
 * [_.disjoin](#_disjoinpredicates)
 * [_.flip](#_flipfun)
 * [_.flip2](#_flip2fun)
 * [_.fnull](#_fnullfun--defaults)
 * [_.functionalize](#_functionalizemethod)
 * [_.juxt](#_juxtfuns)
 * [_.mapArgs](#_mapargs)
 * [_.mapArgsWith](#_mapargswith)
 * [_.methodize](#_methodizefunc)
 * [_.pipeline](#_pipelinefunctions)
 * [_.splat](#_splatfun)
 * [_.unsplat](#_unsplatfun)
 * [_.unsplatl](#_unsplatlfun)

For some more insights have a look at [the tests](https://github.com/node4good/lodash-contrib/blob/master/test/function.combinators.js).


_.bound(obj, fname)
-------------------

Returns the function property of `obj` by `fname`, bound to `obj`.

**Arguments**

 1. `obj` (Object): The object that holds the property.
 2. `fname` name of the property.

**Results**

(Function): Returns a function bound to `obj`.

**Example**

```javascript
var obj = {
  fun: function(b) {
    return this.a + b;
  },
  a: 'hello ',
  nofun: null
};
var f = _.bound(obj, 'fun');
f('there') // → 'hello there'
```


_.comparator(fun)
-----------------

Takes a predicate-like and returns a comparator (-1, 0, 1).

**Arguments**

 1. `fun` (Function): The function from which we the comparator get created.

**Returns**

(integer): Returns `-1` if `fun(x, y)` evaluates to a truthy value, `1` if `fun(y, x)` evaluates
to a falsy value, 0 otherwise.

**Example**

```javascript
var lessThan = _.comparator(function(x, y) { return x < y });
lessThan(1, 2); // → -1
lessThan(3, 2); // → 1
lessThan(2, 2); // → 0
```


_.complement(pred)
-----------------

Returns a function that reverses the sense of a given predicate-like.

**Arguments**

 1. `pred` (Function): Predicate that will be reverted and applied to the arguments.

**Returns**

(boolean): Returns the negation of the result that `pred` would have returned.

**Example**

```javascript
// every value is ok except String
_.filter(['removeme', 1, true], _.complement(_.isString));
```


_.conjoin(predicates)
---------------------------

Composes a bunch of predicates into a single predicate that
checks all elements of an array for conformance to all of the
original predicates.

**Arguments**

 1. `predicates` (Array|Object): The collection of predicates.

**Returns**

(boolean): Rerturns `true` if all elements satisfy the `predicates`, `false` otherwise.

**Example**

```javascript
function isBlue(o) { return o.color == 'blue' }
function isSquare(o) { return o.shape == 'square' }

var blueSquares = _.conjoin(isBlue, isSquare);
var objects = [{
  color: 'red',
  shape: 'square',
  location: 'kitchen'
}, {
  color: 'blue',
  shape: 'square',
  location: 'garden'
}];
blueSquares(objects) // → false
blueSquares([objects[1]]) // → true
```


_.disjoin(predicates)
------------------------------

Composes a bunch of predicates into a single predicate that
checks all elements of an array for conformance to any of the
original predicates.

**Arguments**

 1. `predicates` (Array|Object): The collection of predicates.

**Returns**

(boolean): Returns true if any array elements satisfy any of the `predicates`, false otherwise.

**Example**

```javascript
function isBlue(o) { return o.color == 'blue' }
function isSquare(o) { return o.shape == 'square' }

var blueSquares = _.conjoin(isBlue, isSquare);
var objects = [{
  color: 'red',
  shape: 'square',
  location: 'kitchen'
}, {
  color: 'blue',
  shape: 'square',
  location: 'garden'
}];
blueSquares(objects) // → true
```


_.flip(fun)
-----------

Flips an arbitrary number of args of a function.

**Arguments**

 1. `fun` (Function): The function whose arguments will be flipped.

**Returns**

Result of `fun` applied to the arguments.

**Example**

```javascript
var echo = function() { return Array.prototype.slice.call(arguments, 0); };
deepEqual(_.flip(echo)(1, 2, 3, 4), [4, 3, 2, 1]
```


_.flip2(fun)
------------

Flips the first two arguments of a function.

**Arguments**

 1. `fun` (Function): The function whose first two arguments will be flipped.

**Returns**

Result of `fun` applied to the arguments.

**Example**

```javascript
var div = function(n, d) { return n/d; };
_.flip2(div)(10, 2) // → 0.2
```


_.fnull(fun [, defaults])
----------------------------

Returns a function that protects a given function from receiving non-existy values.
Each subsequent value provided to `fnull` acts as the default to the original function
should a call receive non-existy values in the defaulted arg slots.

**Arguments**

 1. `fun` (Function): The function that is going to be protected against non-existy values.
 2. `defaults`: a collection of default values

**Returns**

Result of `fun` applied to the arguments, using the provided defaults if any non-existy values
are found.

**Example**

```javascript
var a = [1, 2, 3, null, 5];
var safeMult = _.fnull(function(total, n) { return total * n; }, 1, 1);
_.reduce(a, safeMult) // → 30
```


_.functionalize(method)
-----------------------

Takes a method-style function (one which uses `this`) and pushes
`this` into the argument list. The returned function uses its first
argument as the receiver/context of the original function, and the rest
of the arguments are used as the original's entire argument list.

**Arguments**

 1. `method` (Function): A method-style function.

**Returns**

Result of `method` applied to the arguments.

**Example**

```javascript
var rect = {
  x: 2,
  y: 3,
  area: function() {return this.x * this.y;},
  extrude: function(z) {return _.merge(this, {z: z});}
};
var areaFunc = _.functionalize(rect.area),
    extrudeFunc = _.functionalize(rect.extrude);
areaFunc(rect) // → 6
```


_.juxt(funs)
------------------

Returns a function that returns an array of the calls to each given function for some arguments.

**Arguments**

 1. `funs` (Array): The array of functions.

**Returns**

(Array): containing the results of the application of each function to the passed arguments.

**Example**

```javascript
var run = _.juxt(function(s, n) { return s.length + n; }, parseInt);
run('42', 10) // → [12, 42]
```


_.mapArgs()
---------------

Maps the arguments of a function, takes the mapping function first so it can be used as a combinator.

// TODO


_.mapArgsWith()
---------------

// TODO


_.methodize(func)
-----------------

Takes a function and pulls the first argument out of the argument
list and into `this` position. The returned function calls the original
with its receiver (`this`) prepending the argument list. The original
is called with a receiver of `null`.

**Arguments**

 1. `func` (Function): The function which will be invoked with `null` as context.

**Returns**

Returns the result of `method` applied to the arguments.

**Example**

```javascript
function area(rect) { return rect.x * rect.y; }
var rect = {
  x: 2,
  y: 3,
  area: _.methodize(area)
};
rect.area() // → 6
```

_.pipeline(functions)
---------------------------

Takes some number of functions, either as an array or variadically
and returns a function that takes some value as its first argument
and runs it through a pipeline of the original functions given.

**Aliases**

`_.t`

**Arguments**

 1. `functions` (Array|Object): The collection of functions, either in an array or passed one by one.

**Returns**

(Object): Returns the result of the pipelined application of all `functions`.

**Example**

```javascript
var double = function(arr) { return _.map(arr, function(n) { return 2 * n }); }
var filterOdd = function(arr) {
  return _.filter(arr, _.isOdd);
};

var doubleOdd = _.pipeline(filterOdd, double);
doubleOdd([1,2,3,4]); // → [2, 6]
```


_.splat(fun)
------------

Takes a function expecting varargs and returns a function that takes an array and
uses its elements as the args to the original function

**Arguments**

 1. `fun` that takes varargs

**Returns**

Result of `fun` applied to the arguments.

**Example**

```javascript
var sumArgs = function () {
  return _.reduce(arguments, function (a, b) { return a + b; }, 0);
};
var sumArray = _.splat(sumArgs);
sumArray([1, 2, 3]) // → 6
```


_.unsplat(fun)
--------------

Takes a function expecting an array and returns a function that takes varargs and wraps all
in an array that is passed to the original function.

**Aliases**

`_.unsplatr`

**Arguments**

 1. `fun` (Function): The function that will be applied.

**Returns**

Result of `fun` applied to the arguments.

**Example**

```javascript
var echo3 = _.unsplat(function (first, second, rest) { return [first, second, rest]; });
echo3(1, 2, 3, 4) // → [1, 2, [3, 4]]
```


_.unsplatl(fun)
---------------

Same as unsplat, but the rest of the arguments are collected in the first parameter.

**Arguments**

 1. `fun` (Function): The function that will be applied.

**Returns**

Result of `fun` applied to the arguments.

**Example**

```javascript
var echo3 = _.unsplatl(function (rest, penultimate, ultimate) { return [rest, penultimate, ultimate]; });
echo3(1, 2, 3, 4) // → [[1, 2], 3, 4]
```
