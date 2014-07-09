$(document).ready(function() {

  module("lodash.util.existential");

  test("exists", function() {
    equal(_.exists(null), false, 'should know that null is not existy');
    equal(_.exists(undefined), false, 'should know that undefined is not existy');

    equal(_.exists(1), true, 'should know that all but null and undefined are existy');
    equal(_.exists(0), true, 'should know that all but null and undefined are existy');
    equal(_.exists(-1), true, 'should know that all but null and undefined are existy');
    equal(_.exists(3.14), true, 'should know that all but null and undefined are existy');
    equal(_.exists('undefined'), true, 'should know that all but null and undefined are existy');
    equal(_.exists(''), true, 'should know that all but null and undefined are existy');
    equal(_.exists(NaN), true, 'should know that all but null and undefined are existy');
    equal(_.exists(Infinity), true, 'should know that all but null and undefined are existy');
    equal(_.exists(true), true, 'should know that all but null and undefined are existy');
    equal(_.exists(false), true, 'should know that all but null and undefined are existy');
    equal(_.exists(function(){}), true, 'should know that all but null and undefined are existy');

    equal(_.exists(0, null, '2'), false, 'should know that null is not existy');
    equal(_.exists(0, undefined, '2'), false, 'should know that undefined is not existy');
    equal(_.exists(0, 'undefined', NaN, Infinity, true, false, function(){}), true, 'should know that all but null and undefined are existy');
  });

  test("truthy", function() {
    equal(_.truthy(null), false, 'should know that null, undefined and false are not truthy');
    equal(_.truthy(undefined), false, 'should know that null, undefined and false are not truthy');
    equal(_.truthy(false), false, 'should know that null, undefined and false are not truthy');

    equal(_.truthy(1), true, 'should know that everything else is truthy');
    equal(_.truthy(0), true, 'should know that everything else is truthy');
    equal(_.truthy(-1), true, 'should know that everything else is truthy');
    equal(_.truthy(3.14), true, 'should know that everything else is truthy');
    equal(_.truthy('undefined'), true, 'should know that everything else is truthy');
    equal(_.truthy(''), true, 'should know that everything else is truthy');
    equal(_.truthy(NaN), true, 'should know that everything else is truthy');
    equal(_.truthy(Infinity), true, 'should know that everything else is truthy');
    equal(_.truthy(true), true, 'should know that everything else is truthy');
    equal(_.truthy(function(){}), true, 'should know that everything else is truthy');

    equal(_.truthy(0, null, '2'), false, 'should know that null is not truthy');
    equal(_.truthy(0, undefined, '2'), false, 'should know that undefined is not truthy');
    equal(_.truthy(0, undefined, '2'), false, 'should know that false is not truthy');
    equal(_.truthy(0, 'undefined', NaN, Infinity, true, function(){}), true, 'should know that all but null and undefined are truthy');
  });

  test("falsey", function() {
    equal(_.falsey(null), true, 'should know that null, undefined and false are falsey');
    equal(_.falsey(undefined), true, 'should know that null, undefined and false are falsey');
    equal(_.falsey(false), true, 'should know that null, undefined and false are falsey');

    equal(_.falsey(1), false, 'should know that everything else is not falsey');
    equal(_.falsey(0), false, 'should know that everything else is not falsey');
    equal(_.falsey(-1), false, 'should know that everything else is not falsey');
    equal(_.falsey(3.14), false, 'should know that everything else is not falsey');
    equal(_.falsey('undefined'), false, 'should know that everything else is not falsey');
    equal(_.falsey(''), false, 'should know that everything else is not falsey');
    equal(_.falsey(NaN), false, 'should know that everything else is not falsey');
    equal(_.falsey(Infinity), false, 'should know that everything else is not falsey');
    equal(_.falsey(true), false, 'should know that everything else is not falsey');
    equal(_.falsey(function(){}), false, 'should know that everything else is not falsey');
 
    equal(_.falsey(1, null, '2'), true, 'should know that null is falsey');
    equal(_.falsey(1, undefined, '2'), true, 'should know that undefined is falsey');
    equal(_.falsey(1, false, '2'), true, 'should know that false is falsey');
    equal(_.falsey(1, 'undefined', NaN, Infinity, true, function(){}), false, 'should know that only null undefined and false are falsey');
  });

  test('firstExisting', function() {
    equal(_.firstExisting('first', 'second'), 'first', 'should return the first existing value');
    equal(_.firstExisting(null, 'second'), 'second', 'should ignore null');
    equal(_.firstExisting(void 0, 'second'), 'second', 'should ignore undefined');
    equal(_.firstExisting(null, void 0, 'third'), 'third', 'should work with more arguments');
  });

});
