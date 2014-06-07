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
});

