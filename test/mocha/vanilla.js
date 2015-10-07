var assert = require('assert');

describe("vanilla", function () {
  it("should install the extensions", function (done) {
    var contrib = require('../..');
    assert('walk' in contrib);
    done();
  });

  it("but should leave 'lodash' alone", function (done) {
    var lodash = require('lodash');
    assert(!('walk' in lodash));
    done();
  });

  it("but should not override methods", function (done) {
    var lodash = require('lodash');
    var contrib = require('../..');
    var methods = lodash.remove(lodash.keys(lodash), '_');
    lodash.forEach(methods, function(m) {
      assert.equal(contrib[m].toString(), lodash[m].toString(), m + ' should be the same');
    });
    done();
  });
});

