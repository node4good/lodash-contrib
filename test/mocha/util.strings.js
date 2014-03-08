var _ = require('lodash');
require('../../_.util.strings');
var assert = require('assert');

describe("array.builders", function () {
  describe("fromQuery", function () {
    it("can convert a query string to a hash", function (done) {
      var query = 'foo%26bar=baz&test=total+utter+success';
      assert(_.isEqual(_.fromQuery(query), {'foo&bar': 'baz', 'test': 'total utter success'}));
      done();
    });
  });

  describe("toQuery", function () {
    it('can convert a hash to a query string', function (done) {
      var obj = {'foo&bar': 'baz', 'test': 'total success'};
      assert.equal(_.toQuery(obj), 'foo%26bar=baz&test=total%20success', 'can convert a hash to a query string');
      done();
    });
  });
});

