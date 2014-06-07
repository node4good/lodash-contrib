var _ = require('../..');
var assert = require('assert');

describe("array.builders", function () {
    describe("weave", function () {
        it("should weave one array", function (done) {
            assert.deepEqual(_.weave([1,[2]]), [1,[2]], 'should weave one array');
            done();
        });
    });
});
