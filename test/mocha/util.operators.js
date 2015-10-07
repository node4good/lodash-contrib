var _ = require('../..');
var assert = require('assert');

describe("lodash.util.operators", function () {

  it("addContrib", function() {
    assert.equal(_.addContrib(1, 1), 2, '1 + 1 = 2');
    assert.equal(_.addContrib(3, 5), 8, '3 + 5 = 8');
    assert.equal(_.addContrib(1, 2, 3, 4), 10, 'adds multiple operands');
  });

  it("sub", function() {
    assert.equal(_.sub(1, 1), 0, '1 - 1 = 0');
    assert.equal(_.sub(5, 3), 2, '5 - 3 = 2');
    assert.equal(_.sub(10, 9, 8, 7), -14, 'subtracts multiple operands');
  });

  it("mul", function() {
    assert.equal(_.mul(1, 1), 1, '1 * 1 = 1');
    assert.equal(_.mul(5, 3), 15, '5 * 3 = 15');
    assert.equal(_.mul(1, 2, 3, 4), 24, 'multiplies multiple operands');
  });

  it("div", function() {
    assert.equal(_.div(1, 1), 1, '1 / 1 = 1');
    assert.equal(_.div(15, 3), 5, '15 / 3 = 5');
    assert.equal(_.div(15, 0), Infinity, '15 / 0 = Infinity');
    assert.equal(_.div(24, 2, 2, 2), 3, 'divides multiple operands');
  });

  it("mod", function() {
    assert.equal(_.mod(3, 2), 1, '3 / 2 = 1');
    assert.equal(_.mod(15, 3), 0, '15 / 3 = 0');
  });

  it("inc", function() {
    assert.equal(_.inc(1), 2, '++1 = 2');
    assert.equal(_.inc(15), 16, '++15 = 16');
  });

  it("dec", function() {
    assert.equal(_.dec(2), 1, '--2 = 1');
    assert.equal(_.dec(15), 14, '--15 = 15');
  });

  it("neg", function() {
    assert.equal(_.neg(2), -2, 'opposite of 2');
    assert.equal(_.neg(-2), 2, 'opposite of -2');
    assert.equal(_.neg(true), -1, 'opposite of true');
  });

  it("eqContrib", function() {
    assert.equal(_.eqContrib(1, 1), true, '1 == 1');
    assert.equal(_.eqContrib(1, true), true, '1 == true');
    assert.equal(_.eqContrib(1, false), false, '1 != false');
    assert.equal(_.eqContrib(1, '1'), true, '1 == "1"');
    assert.equal(_.eqContrib(1, 'one'), false, '1 != "one"');
    assert.equal(_.eqContrib(0, 0), true, '0 == 0');
    assert.equal(_.eqContrib(0, false), true, '0 == false');
    assert.equal(_.eqContrib(0, '0'), true, '0 == "0"');
    assert.equal(_.eqContrib({}, {}), false, '{} == {}');
    assert.equal(_.eqContrib(0, 0, 1), false, 'compares a list of arguments');
  });
  it("seq", function() {
    assert.equal(_.seq(1, 1), true, '1 === 1');
    assert.equal(_.seq(1, '1'), false, '1 !== "1"');
    assert.equal(_.seq(0, 0, 1), false, 'compares a list of arguments');
  });
  it("neq", function() {
    assert.equal(_.neq('a', 'b'), true, '"a" != "b"');
    assert.equal(_.neq(1, '1'), false, '1 == "1"');
    assert.equal(_.neq(0, 0, 1), true, 'compares a list of arguments');
  });
  it("sneq", function() {
    assert.equal(_.sneq('a', 'b'), true, '"a" !== "b"');
    assert.equal(_.sneq(1, '1'), true, '1 !== "1"');
    assert.equal(_.sneq(0, 0, 1), true, 'compares a list of arguments');
  });
  it("not", function() {
    assert.equal(_.not(true), false, 'converts true to false');
    assert.equal(_.not(false), true, 'converts false to true');
    assert.equal(_.not('truthy'), false, 'converts truthy values to false');
    assert.equal(_.not(null), true, 'converts falsy values to true');
  });
  it("gtContrib", function() {
    assert.equal(_.gtContrib(3, 2), true, '3 > 2');
    assert.equal(_.gtContrib(1, 3), false, '1 > 3');
    assert.equal(_.gtContrib(1, 2, 1), false, 'compares a list of arguments');
  });
  it("ltContrib", function() {
    assert.equal(_.ltContrib(3, 2), false, '3 < 2');
    assert.equal(_.ltContrib(1, 3), true, '1 < 3');
    assert.equal(_.ltContrib(1, 2, 1), false, 'compares a list of arguments');
  });
  it("gteContrib", function() {
    assert.equal(_.gteContrib(3, 2), true, '3 >= 2');
    assert.equal(_.gteContrib(1, 3), false, '1 >= 3');
    assert.equal(_.gteContrib(3, 3), true, '3 >= 3');
    assert.equal(_.gteContrib(2, 3, 1), false, 'compares a list of arguments');
  });
  it("lteContrib", function() {
    assert.equal(_.lteContrib(3, 2), false, '3 <= 2');
    assert.equal(_.lteContrib(1, 3), true, '1 <= 3');
    assert.equal(_.lteContrib(3, 3), true, '3 <= 3');
    assert.equal(_.lteContrib(2, 2, 1), false, 'compares a list of arguments');
  });
  it("bitwiseAnd", function() {
    assert.equal(_.bitwiseAnd(1, 1), 1, '1 & 1');
    assert.equal(_.bitwiseAnd(1, 0), 0, '1 & 0');
    assert.equal(_.bitwiseAnd(1, 1, 0), 0, 'operates on multiple arguments');
  });
  it("bitwiseOr", function() {
    assert.equal(_.bitwiseOr(1, 1), 1, '1 | 1');
    assert.equal(_.bitwiseOr(1, 0), 1, '1 | 0');
    assert.equal(_.bitwiseOr(1, 1, 2), 3, 'operates on multiple arguments');
  });
  it("bitwiseXor", function() {
    assert.equal(_.bitwiseXor(1, 1), 0, '1 ^ 1');
    assert.equal(_.bitwiseXor(1, 2), 3, '1 ^ 2');
    assert.equal(_.bitwiseXor(1, 2, 3), 0, 'operates on multiple arguments');
  });
  it("bitwiseNot", function() {
    assert.equal(_.bitwiseNot(1), -2, '~1');
    assert.equal(_.bitwiseNot(2), -3, '~2');
  });
  it("bitwiseLeft", function() {
    assert.equal(_.bitwiseLeft(1, 1), 2, '1 << 1');
    assert.equal(_.bitwiseLeft(1, 0), 1, '1 << 0');
    assert.equal(_.bitwiseLeft(1, 1, 1), 4, 'operates on multiple arguments');
  });
  it("bitwiseRight", function() {
    assert.equal(_.bitwiseRight(1, 1), 0, '1 >> 1');
    assert.equal(_.bitwiseRight(2, 1), 1, '2 >> 1');
    assert.equal(_.bitwiseRight(3, 1, 1), 0, 'operates on multiple arguments');
  });
  it("bitwiseZ", function() {
    assert.equal(_.bitwiseZ(-1, 1), 2147483647, '-1 >>> 1');
    assert.equal(_.bitwiseZ(-1, 1, 1), 1073741823, 'operates on multiple arguments');
  });

});
