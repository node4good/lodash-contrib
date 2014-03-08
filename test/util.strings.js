
$(document).ready(function() {

  module('lodash.util.strings');

  test('explode', function() {
    deepEqual(_.explode('Virgil'), ['V','i','r','g','i','l'], 'Should explode a string into an array of characters.');
  });

  test('implode', function() {
    equal(_.implode(['H','o','m','e','r']), 'Homer', 'Should implode an array of characters into a single string.');
  });

  test('camelCase', function() {
    equal(_.camelCase('punic-wars'), 'punicWars', 'Should convert a dashed-format string to camelCase.');
  });

  test('toDash', function() {
    equal(_.toDash('trojanWar'), 'trojan-war', 'Should convert a camelCase string to dashed-format.');
    equal(_.toDash('PersianWar'), 'persian-war', 'Should convert a PascalCase string to dashed-format.');
  });

  test('strContains', function() {
    equal(_.strContains('Metaphysics', 'physics'), true, 'Should return true if string contains search string.');
    equal(_.strContains('Poetics', 'prose'), false, 'Should return false if string does not contain search string.');

    var thrower = function() { _.strContains([], ''); };
    throws(thrower, TypeError, 'Throws TypeError if first argument is not a string.');
  });

  var preRegex1 = '/__value__/i.test(this.email)||/__value__/i.test(this.fb_uniq)||/__value__/i';
  var postRegex1 = '\\/__value__\\/i\\.test\\(this\\.email\\)\\|\\|\\/__value__\\/i\\.test\\(this\\.fb_uniq\\)\\|\\|\\/__value__\\/i';
  test('strContains', function() {
    equal(_.regexEscape('Metaphysics'), 'Metaphysics', 'Should not change strings without special chars.');
    equal(_.regexEscape(preRegex1), postRegex1, 'Should escape a string wirh char that have special meaning within a Regex.');
  });

  test('humanize', function() {
    equal(_.humanize("lowercase"), "Lowercase");
    equal(_.humanize("Class"), "Class");
    equal(_.humanize("MyClass"), "My Class");
    equal(_.humanize("HTML"), "HTML");
    equal(_.humanize("PDFLoader"), "PDF Loader");
    equal(_.humanize("AString"), "A String");
    equal(_.humanize("SimpleXMLParser"), "Simple XML Parser");
    equal(_.humanize("LastUpdateDateInt"), "Last Update Date Int");
    equal(_.humanize("LastUpdate_date_IntHTML"), "Last Update date Int HTML");
  });
});
