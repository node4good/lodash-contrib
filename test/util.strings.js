
$(document).ready(function() {

  module('lodash.util.strings');

  test('explode', function() {
    deepEqual(_.explode('Virgil'), ['V','i','r','g','i','l'], 'Should explode a string into an array of characters.');
  });

  test('fromQuery', function() {
    var query = 'foo%5Bbar%5D%5Bbaz%5D%5Bblargl%5D=blah&foo%5Bbar%5D%5Bbaz%5D%5Bblargr%5D=woop&blar=bluh&abc[]=123&abc[]=234';
    ok(_.isEqual(_.fromQuery(query), {
      'foo': {
        'bar': {
          'baz': {
            'blargl': 'blah',
            'blargr': 'woop'
          }
        }
      },
      'blar': 'bluh',
      'abc': [
        '123',
        '234'
      ]
    }), 'can convert a query string to a hash');
  });

  test('implode', function() {
    equal(_.implode(['H','o','m','e','r']), 'Homer', 'Should implode an array of characters into a single string.');
  });

  test('toDash', function() {
    equal(_.toDash('trojanWar'), 'trojan-war', 'Should convert a camelCase string to dashed-format.');
    equal(_.toDash('PersianWar'), 'persian-war', 'Should convert a PascalCase string to dashed-format.');
  });

  test('toQuery', function() {
    var obj = {'foo&bar': 'baz', 'test': 'total success', 'nested': {'works': 'too'}, 'isn\'t': ['that', 'cool?']};
    equal(_.toQuery(obj), 'foo%26bar=baz&test=total%20success&nested%5Bworks%5D=too&isn\'t%5B%5D=that&isn\'t%5B%5D=cool%3F', 'can convert a hash to a query string');
  });

  test('strContains', function() {
    equal(_.strContains('Metaphysics', 'physics'), true, 'Should return true if string contains search string.');
    equal(_.strContains('Poetics', 'prose'), false, 'Should return false if string does not contain search string.');

    var thrower = function() { _.strContains([], ''); };
    throws(thrower, TypeError, 'Throws TypeError if first argument is not a string.');
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

  test( 'slugify', function() {
    equal(_.slugify('String'), 'string', 'lower-cases strings for slugs');
    equal(_.slugify('string with spaces'), 'string-with-spaces', 'converts a string with spaces into a slug');
    equal(_.slugify('string.with.dots'), 'string-with-dots', 'converts a string with dots into a slug');
    equal(_.slugify('TitleCase'), 'title-case', 'converts TitleCase strings into slugs');
    equal(_.slugify('i-am-a-slug'), 'i-am-a-slug', 'leaves strings that are already slugs alone');
  });
});
