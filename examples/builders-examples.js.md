Examples for builder functions
===================

`_.object.builders.js` contains functions that are useful when small changes to JavaScript
objects are needed.

Each section gives use cases showing how a given function could be used:

 * [_.merge](#_merge-objs-)
 * [_.renameKeys](#_renamekeysobj-kobj)
 * [_.snapshot](#_snapshotobj)
 * [_.updatePath](#_updatepathobj-fun-ks-defaultvalue)
 * [_.setPath](#_setpathobj-value-ks-defaultvalue)
 * [_.frequencies](#_frequenciesobj)

For some more insights have a look at [the tests](https://github.com/node4good/lodash-contrib/blob/master/test/object.builders.js).

_.merge(/* objs */)
-------------------

Merges two or more objects starting with the left-most and applying the keys right-word.

**Arguments**

 1. an arbitrary number of parameters consisting of JavaScript objects, all of which remain unchanged.

**Returns**

(Object): the merged object.

**Example**

```javascript
var merged = _.merge({a: 1, b: 1}, {a:2, c: 2}, {a: 3});
merged.a; // → 3
merged.b; // → 1
merged.c; // → 2
```

_.renameKeys(obj, kobj)
-----------------------

Takes an object and another object of strings to strings where the second object describes
the key renaming to occur in the first object.

**Arguments**

 1. `obj` that will be used as starting point, it remains unchanged.
 2. `kobj` string to string mapping defining the renaming.

**Returns**

(Object): `obj` with renamed keys.

**Example**

```javascript
var obj = {
  id: 'tester@test.com',
  name: 'tester'
};

var user = _.renameKeys(obj, { 'id': 'email'});
obj.id; // → 'tester@test.com'
user.id; // → undefined
user.email; // → 'tester@test.com'
```

_.snapshot(obj)
---------------

Snapshots an object deeply. Based on the [version by Keith Devens](http://archive.today/FVuq2).

**Arguments**

 1. `obj` that will be snapshotted.

**Returns**

(Object): copy of `obj`.

**Example**

```javascript
var coordsFirstTick = {x: 1, y: 1};
var coordsSecondTick = _.snapshot(coordsFirstTick);
coordsSecondTick.x = 2;
console.log(coordsFirstTick.x); // → 1
```

_.updatePath(obj, fun, ks, defaultValue)
----------------------------------------

Updates the value at any depth in a nested object based on the path described by
the keys given. The function provided is supplied the current value and is expected
to return a value for use as the new value. If no keys are provided, then the object
itself is presented to the given function.

**Arguments**

 1. `obj` that will be updated.
 2. `fun` that will be applied on the last element of `ks`.
 3. `ks` as a list of steps specifying the path to the attribute that will be updated.
 4. `defaultValue` that will be used if the key does not exist in `obj`.

**Returns**

(Objct): `obj` with updated keys.

**Example**

```javascript
// we could either give a path to a value in a nested array
var nested = [0, 1, [3, 3], 4];
_.updatePath(nested, _.always(2), [2, 0]); // → [0, 1, [2, 3], 4]
nested; // → [0, 1, [3, 3], 4]

// ...or we could pass an array of keys to traverse
var nested = {
  one: {
    two: {
      three: 4
    }
  }
};
_.updatePath(nested, _.always(3), ['one', 'two', 'three']).one.two.three; // → 3
nested.one.two.three; // → 4
```

_.setPath(obj, value, ks, defaultValue)
----------------------------------------

Sets the value at any depth in a nested object based on the path described by the keys given.

See [_.updatePath](#_updatepathobj-fun-ks-defaultvalue), this is just syntactic sugar that allows you to pass a value as second
parameter, without having to wrap it into a function by yourself.


_.frequencies(obj)
------------------------------

Returns an object where each element of an array is keyed to the number of times that
it occurred in said array.

**Arguments**

1. `obj` as array or object, as long as the object is not nested the expected object
gets returned.

**Returns**

(Object): with the values as keys and the occurrencies of these as values.

**Example**

```javascript
_.frequencies([0, 2, 2, 7, 7, 7]); // → { 0: 1, 2: 2, 7: 3}
_.frequencies({a: 1, b: 1, c: 2, d: 1}) // → {1: 3, 2: 1}
```
