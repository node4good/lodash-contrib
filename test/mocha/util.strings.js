var _ = require('../..');
var assert = require('assert');
var expect = require('chai').expect;

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

  describe("Title Case", function () {
    it('can convert a sentance to a Title Case', function (done) {
      assert.equal(_.titleCase('Hey, dudes!'), 'Hey, Dudes!');
      assert.equal(_.titleCase('(Where are you?)'), '(Where Are You?)');
      assert.equal(_.titleCase('Boogaloo dudes (Stand up, come on!)'), 'Boogaloo Dudes (Stand Up, Come On!)');
      done();
    });
  });

  describe('slugify', function () {

    it('lower-cases strings for slugs', function () {
      expect(_.slugify('String')).to.equal('string');
    });

    it('converts a string with spaces into a slug', function () {
      expect(_.slugify('string with spaces')).to.equal('string-with-spaces');
    });

    it('converts a string with dots into a slug', function () {
      expect(_.slugify('string.with.dots')).to.equal('string-with-dots');
    });

    it('converts TitleCase strings into slugs', function () {
      expect(_.slugify('TitleCase')).to.equal('title-case');
    });

    it('leaves strings that are already slugs alone', function () {
      expect(_.slugify('i-am-a-slug')).to.equal('i-am-a-slug');
    });

  });
});
