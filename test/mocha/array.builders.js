var _ = require('../..');
var assert = require('assert');

describe("array.builders", function () {
    describe("weave", function () {
        var a = [1, 2, 3];
        var b = [1, 2];
        var c = ['a', 'b', 'c'];
        var d = [1, [2]];

        it('should weave zero arrays', function (done) {
            assert.deepEqual(_.weave(), []);
            done();
        });

        it("should weave one array", function (done) {
            assert.deepEqual(_.weave([]), []);
            assert.deepEqual(_.weave([1,[2]]), [1,[2]]);
            done();
        });

        it("should weave two arrays", function (done) {
            assert.deepEqual(_.weave(a, b), [1, 1, 2, 2, 3]);
            assert.deepEqual(_.weave(a, b), [1, 1, 2, 2, 3]);
            assert.deepEqual(_.weave(a, a), [1, 1, 2, 2, 3, 3]);
            assert.deepEqual(_.weave(c, a), ['a', 1, 'b', 2, 'c', 3]);
            assert.deepEqual(_.weave(a, d), [1, 1, 2, [2], 3]);
            done();
        });

        it("should weave more than two arrays", function (done) {
            assert.deepEqual(_.weave(a, b, c), [1, 1, 'a', 2, 2, 'b', 3, 'c']);
            assert.deepEqual(_.weave(a, b, c, d), [1, 1, 'a', 1, 2, 2, 'b', [2], 3, 'c']);
            done();
        });
    });
});
