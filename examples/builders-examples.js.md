Examples for builder functions
===================

`_.object.builders.js` contains functions that are useful when small changes to JavaScript 
objects are needed.

Each section gives use cases showing how a given function could be used.

For some more insights have a look at [the tests](https://github.com/TheNodeILs/lodash-contrib/blob/master/test/object.builders.js).


_.merge(/* objs */)
-------------------

Merges two or more objects starting with the left-most and applying the keys right-word

Given

 * an arbitrary number of parameters consisting of JavaScript objects, all of which remain unchanged

We can merge all of them in a single object, latest merged overrides previous

```javascript
var merged = _.merge({a: 1, b: 1}, {a:2, c: 2}, {a: 3});
merged.a; // -> 3
merged.b; // -> 1
merged.c; // -> 2
```

_.renameKeys(obj, kobj)
-----------------------

Takes an object and another object of strings to strings where the second object describes 
the key renaming to occur in the first object.

Given

 * `obj` that will be used as starting point, it remains unchanged
 * `kobj` string to string mapping defining the renaming

We can change the keys of an object coming from an external API to suit our domain

```javascript
var fromApi = {
  id: 'tester@test.com',
  name: 'tester',
  nickname: 'tt'
};

var user = _.renameKeys(fromApi, { 'id': 'email'});
fromApi.id; // -> 'tester@test.com'
user.id; // -> undefined
user.email; // -> 'tester@test.com'
```

_.snapshot(obj)
---------------

Snapshots an object deeply. Based on the version by Keith Devens (site not anymore reachable) 
http://archive.today/FVuq2
 
Given

 * `obj` that will be snapshotted

We can get a copy of `obj`, suppose you have this situation

```javascript
var coordsFirstTick = {x: 1, y: 1};
var coordsSecondTick = coordsFirstTick;
coordsSecondTick.x = 2;
console.log(coordsFirstTick.x); // -> 2
```

which is not what you might want. So you could do

```javascript
var coordsFirstTick = {x: 1, y: 1};
var coordsSecondTick = _.snapshot(coordsFirstTick);
coordsSecondTick.x = 2;
console.log(coordsFirstTick.x); // -> 1
```

_.updatePath(obj, fun, ks, defaultValue)
----------------------------------------

Updates the value at any depth in a nested object based on the path described by 
the keys given. The function provided is supplied the current value and is expected 
to return a value for use as the new value. If no keys are provided, then the object 
itself is presented to the given function.

Given

 * `obj` that will be updated
 * `fun` that will be applied on the last element of `ks`
 * `ks` as a list of steps specifying the path to the attribute that will be updated
 * `defaultValue` that will be used if the key does not exist in `obj`

We could either give a path to a value in a nested array

```javascript
var nested = [0, 1, [3, 3], 4];
_.updatePath(nested, _.always(2), [2, 0]); // -> [0, 1, [2, 3], 4]
nested; // -> [0, 1, [3, 3], 4]
```

or we could pass an array of keys to traverse

```javascript
var nested = {
  one: {
    two: {
      three: 4
    }
  }
};
_.updatePath(nested, _.always(3), ['one', 'two', 'three']).one.two.three; // -> 3
nested.one.two.three; // -> 4
```

from here one could go wild and, for example, obtain under the same parent node the updated branch
and the original one, which might be useful for undo-like tasks

```javascript
var actions = {
  1405977738834: {
    edit: {
      41: 43
    }
  }
};
var current = _.updatePath(nested, _.always(42), ['undo', '1405977738834', 'edit'], {});
```

where `current` now contains two branches, one which starts with the tick `1405977738834`, the
other which starts with `undo` and contains the changed object, so swapping back is really easy.


_.setPath(obj, value, ks, defaultValue)
----------------------------------------

Sets the value at any depth in a nested object based on the path described by the keys given.

Given `_.updatePath` this is just syntactic sugar that allows you to pass a value as second 
parameter, without having to wrap it into a function by yourself.


\_.curry2(\_.countBy)(_.identity)
------------------------------

Returns an object where each element of an array is keyed to the number of times that 
it occurred in said array.

Given

* a first parameter it returns an object with the values as keys and the occurrencies
of these as values

```javascript
_.frequencies([0, 2, 2, 7, 7, 7]); // -> { 0: 1, 2: 2, 7: 3}
_.frequencies({a: 1, b: 1, c: 2, d: 1}) // -> {1: 3, 2: 1}
```

as long as the object is not nested it returns the expected results