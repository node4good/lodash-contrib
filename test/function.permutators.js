$(document).ready(function () {

  module("lodash.function.permutators");

  test("product", function () {
    deepEqual(_.product('me', 'hi'), [["m", "h"], ["m", "i"], ["e", "h"], ["e", "i"]], 'should return product of strings');
    deepEqual(_.product({ who: ['me', 'you'], say: ['hi', 'by'] }), [{ "who": "me", "say": "hi" }, { "who": "me", "say": "by" }, { "who": "you", "say": "hi" }, { "who": "you", "say": "by" }], 'should return product of object keys and lists');
    deepEqual(_.product(['me', 'you'], ['hi', 'by']), [["me", "hi"], ["me", "by"], ["you", "hi"], ["you", "by"]], 'should return product of lists');
  });

  test("combinations", function () {
    deepEqual(_.combinations([1, 2, 3], 2), [[1, 2], [1, 3], [2, 3]], 'should return combinations of list');
  });
  
  test("combinationsWithReplacement", function () {
    deepEqual(_.combinationsWithReplacement([1, 2, 3], 2), [[1, 1], [1, 2], [1, 3], [2, 2], [2, 3], [3, 3]], 'should return combinationsWithReplacement of list');
  });

  test("permutations", function () {
    deepEqual(_.permutations([1, 2, 3], 2), [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]], 'should return n=2 permutations of list');
    deepEqual(_.permutations([1, 2, 3], 3), [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]], 'should return n=3 permutations of list');
    deepEqual(_.permutations('cat', 2), [["c", "a"], ["c", "t"], ["a", "c"], ["a", "t"], ["t", "c"], ["t", "a"]], 'should return n=2 permutations of string');
  });

});
