module.exports = function (grunt) {
  var _ = require('lodash');
  var sandboxCode;
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-docco");
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks("grunt-tocdoc");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    contribBanner: "// <%= pkg.name %> v<%= pkg.version %>\n" +
      "// =========================\n\n" +
      "// > <%= pkg.homepage %>\n" +
      "// > (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors\n" +
      "// > (c) 2013 Refael Ackermann & Empeeric\n" +
      "// > <%= pkg.name %> may be freely distributed under the <%= pkg.license %> license.\n\n",

    concat: {
      all: {
        src: ["_.*.js", 'gen/browserified.js'],
        dest: "dist/lodash-contrib.js",
        options: { banner: "<%= contribBanner %>" }
      }
    },

    uglify: {
      all: {
        files: { "dist/lodash-contrib.min.js": "dist/lodash-contrib.js" },
        options: { banner: "<%= contribBanner %>" }
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
      concat: ['test/dist-concat.html'],
      min: ['test/dist-min.html'],
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

    watch: {
      test: {
        files: [
          "_.*.js",
          "test/*.js"
        ],
        tasks: ["test"]
      }
    },

    webScaffold: {
      all: {
        files: {
          'gen/webScaffold.js': 'common-js/*.*'
        }
      }
    },

    sandboxCode: {
      all: {
        files: [
          { src: ['_.*.js'] }
        ]
      }
    },

    wrapForNode: {
      all: {
        files: [
          {
            src: ['common-js/*.*'],
            dst: 'lodash-contrib.js'
          }
        ]
      }
    },

    browserify: {
      dist: {
        files: {
          'gen/browserified.js': 'gen/webScaffold.js'
        }
      },
      test: {
        files: {
          'gen/double.browserified.js': 'lodash-contrib.js'
        },
        browserifyOptions: { debug: true }
      }
    },

    tocdoc: {
      api: {
        files: {
          'index.html': ['docs/*.md', 'CHANGELOG.md']
        }
      }
    },

    docco: {
      docs: {
        src: ['docs/*.md'],
        options: {
          output: 'gh-pages/'
        }
      },
      examples: {
        src: ['examples/*.md'],
        options: {
          output: 'gh-pages/examples/'
        }
      }
    }
  });


  grunt.registerMultiTask('webScaffold', 'web scaffolding task.', function () {
    grunt.log.writeln('Generating the web-scaffold');
    var setup = this.files.pop();
    var code = setup.src.reduce(function (seed, val) { return seed + 'require("../' + val + '")(_);\n'; }, '');
    code += 'module.exports = _;\n';
    grunt.file.write(setup.dest, code);
  });


  grunt.registerMultiTask('sandboxCode', 'sandbox scaffolding task.', function () {
    grunt.log.writeln('Generating the sandbox scaffold');
    var setup = this.files.pop();
    var code = 'function sandbox(inNewContext) {\n';
    code += '    var lodashModule = {}, original_;\n';
    code += '    try {\n';
    code += '        lodashModule = require.cache[require.resolve("lodash")];\n';
    code += '    } catch (e) {\n';
    code += '        if (typeof(window) == "undefined")\n';
    code += '            window = {};\n';
    code += '        if (!window._)\n';
    code += '            window._ = require("lodash");\n';
    code += '        inNewContext = window._;\n';
    code += '    }\n';
    code += '    original_ = lodashModule.exports;\n';
    code += '    lodashModule.exports = inNewContext;\n';
    code += setup.src.reduce(function (seed, val) { return seed + '    require("./' + val + '");\n'; }, '');
    code += '    lodashModule.exports = original_;\n';
    code += '    return inNewContext;\n';
    code += '}\n';
    sandboxCode = {code: code, name: 'sandbox'};
  });


  grunt.registerMultiTask('wrapForNode', 'index.js scaffolding task.', function () {
    grunt.log.writeln('Generating first pass index.js');
    var setup = this.files.pop();
    var code = sandboxCode.code;
    code += 'var inNewContext = ' + sandboxCode.name + '(require("lodash").runInContext());\n\n';
    code += setup.src.reduce(function (seed, val) { return seed + 'require("./' + val + '")(inNewContext);\n'; }, '');
    code += '\n\nmodule.exports                     = inNewContext;\n';
    grunt.file.write(setup.dst, code);
    grunt.log.writeln('Adding explicit method names in index.js');
    var ctrb1 = require('./' + setup.dst);
    Object.keys(ctrb1).forEach(function (name) {
      var len = Math.max(20 - name.length, 2);
      var arr = new Array(len);
      var aligner = arr.join(' ');
      code += 'module.exports.' + name + aligner + ' = inNewContext.' + name + ';\n';
    });
    grunt.file.write(setup.dst, code);
  });


  grunt.registerTask('webGen', ['webScaffold', 'browserify:dist']);
  grunt.registerTask('nodeGen', ['sandboxCode', 'wrapForNode']);
  grunt.registerTask('gen', ['webGen', 'nodeGen']);
  grunt.registerTask('test', ['gen', 'jshint', 'qunit:main', 'mochaTest', 'browserify:test', 'qunit:browserified']);
  grunt.registerTask('dist', ['test', 'concat', 'qunit:concat', 'uglify', 'qunit:min']);
  grunt.registerTask('default', ['dist']);
};
