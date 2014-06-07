var _ = require('../..');
var assert = require('assert');

describe("util.string", function () {
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

  describe("snake_case", function () {
    it('can convert camelCase to a snake_case', function (done) {
      assert.equal(_.snakeCase('AllTheYoungDudes'), 'all_the_young_dudes');
      assert.equal(_.snakeCase('carryTheNews'), 'carry_the_news');
      assert.equal(_.snakeCase('Boogaloo dudes'), 'boogaloo dudes');
      done();
    });
  });

  describe("Title Case", function () {
    it('can convert a sentance to a Title Case', function (done) {
      assert.equal(_.titleCase('Hey, dudes!'), 'Hey, Dudes!');
      assert.equal(_.titleCase('(Where are you?)'), '(Where Are You?)');
      assert.equal(_.titleCase('Boogaloo dudes (Stand up, come on!)'), 'Boogaloo Dudes (Stand Up, Come On!)');
      done();
    });
  });
});

