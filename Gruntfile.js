module.exports = function (grunt) {
  var _ = require('lodash');

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-mocha-test");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    contribBanner: "// <%= pkg.name %> v<%= pkg.version %>\n" +
      "// =========================\n\n" +
      "// > <%= pkg.homepage %>\n" +
      "// > (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors\n" +
      "// > (c) 2016 Refael Ackermann & node4good.org\n" +
      "// > <%= pkg.name %> may be freely distributed under the <%= pkg.license %> license.\n\n",


    copy: {
      main: {
        expand: true,
        flatten: true,
        src: 'gen/lodash*.js',
        dest: 'dist/'
      }
    },


    uglify: {
      all: {
        files: { "gen/lodash-contrib.min.js": "gen/lodash-contrib.js" }
      }
    },


    mochaTest: {
      test: {
        src: ['test/mocha/*.*'],
        options: {
          reporter: "spec"
        }
      }
    },


    qunit: {
      main: ['test/index.html'],
      minified: ['test/dist-min.html'],
      browserified: ['test/browserified.html']
    },


    jshint: {
      all: [
        "*.js",
        "test/*.js"
      ],
      options: {
        es3: true,       // Enforce ES3 compatibility
        indent: 2,       // Indent by 2 spaces
        camelcase: true, // All vars must be camelCase or UPPER_WITH_UNDERSCORES
        eqnull: true,    // Allow 'x == null' convention
        forin: true,     // Require `for x in y` to filter with `hasOwnProperty`
        newcap: true,    // Require constructor names to be capitalized
        "-W058": false   // Allow 'new Constructor' without parens
      }
    },


    browserWrap: {
      all: {
        files: [
          {
            src: ['common-js/*.*'],
            dst: 'gen/temp-scaffold.js'
          }
        ]
      }
    },


    commonjsWrap: {
      all: {
        files: [
          {
            src: ['gen/temp-scaffold.js'],
            dst: 'gen/lodash-contrib.commonjs.js'
          }
        ]
      }
    },


    browserify: {
      dist: {
        files: {
          'gen/lodash-contrib.js': 'gen/temp-scaffold.js'
        }
      },
      test: {
        files: {
          'gen/double.browserified.js': 'gen/lodash-contrib.js'
        },
        browserifyOptions: { debug: true }
      }
    }
  });


  grunt.registerMultiTask('browserWrap', 'index.js scaffolding task.', function () {
    grunt.log.writeln('Generating first pass browserWrap.js');
    var setup = this.files.pop();
    var code = setup.src.reduce(function (seed, val) { return seed + 'require("../' + val + '")(_);\n'; }, '');
    grunt.file.write(setup.dst, code);
  });


  grunt.registerMultiTask('commonjsWrap', 'index.js scaffolding task.', function () {
    grunt.log.writeln('Generating first pass commonjsWrap.js');
    var code = 'var _ = module.exports = require("lodash").runInContext();\n\n';

    var setup = this.files.pop();
    code += setup.src.reduce(function (seed, val) { return seed + grunt.file.read(val); }, '');
    grunt.file.write(setup.dst, code);

    code += '\n //Adding explicit method names for static analysis\n';
    var ctrb1 = require('./' + setup.dst);
    _(ctrb1).keys().sortBy().forEach(function (name) {
      var len = Math.max(20 - name.length, 2);
      var arr = new Array(len);
      var aligner = arr.join(' ');
      code += 'module.exports.' + name + aligner + ' = _.' + name + ';\n';
    });
    grunt.file.write(setup.dst, code);
  });


  grunt.registerTask('gen', ['browserWrap', 'commonjsWrap', 'browserify:dist', 'uglify', 'browserify:test', 'copy']);
  grunt.registerTask('test', ['jshint', 'mochaTest', 'qunit:main', 'qunit:browserified', 'qunit:minified']);
  grunt.registerTask('default', ['gen', 'test']);
};
