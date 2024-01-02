// Karma configuration
// Generated on Wed Jan 23 2019 21:49:41 GMT-0800 (Pacific Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      //files to test
      
      { pattern: 'libs/algorithms.js', type: "module", included: false },
      { pattern: 'libs/array-tools.js', type: "module", included: false },
      { pattern: 'libs/binary-tools.js', type: "module", included: false },
      { pattern: 'libs/bool-tools.js', type: "module", included: false },
      { pattern: 'libs/combinatorics-tools.js', type: "module", included: false },
      { pattern: 'libs/color-tools.js', type: "module", included: false },
      { pattern: 'libs/encoding-tools.js', type: "module", included: false },
      { pattern: 'libs/exception-tools.js', type: "module", included: false },
      { pattern: 'libs/geometry-tools.js', type: "module", included: false },
      { pattern: 'libs/image-tools.js', type: "module", included: false },
      { pattern: 'libs/linear-algebra-tools.js', type: "module", included: false },
      { pattern: 'libs/math-tools.js', type: "module", included: false },
      { pattern: 'libs/object-tools.js', type: "module", included: false },
      { pattern: 'libs/string-tools.js', type: "module", included: false },
      { pattern: 'libs/function-tools.js', type: "module", included: false },
      { pattern: 'libs/time-tools.js', type: "module", included: false },
      { pattern: 'libs/dom-tools.js', type: "module", included: false },
      { pattern: 'libs/number-tools.js', type: "module", included: false },
      { pattern: 'libs/promise-tools.js', type: "module", included: false },
      { pattern: 'libs/random-tools.js', type: "module", included: false },
      { pattern: 'libs/regex-tools.js', type: "module", included: false },
      { pattern: 'libs/stat-tools.js', type: "module", included: false },
      { pattern: 'libs/tree-tools.js', type: "module", included: false },
      { pattern: 'libs/tensor-tools.js', type: "module", included: false },
      { pattern: 'libs/value-tools.js', type: "module", included: false },
      { pattern: 'libs/vector-tools.js', type: "module", included: false },
      { pattern: 'libs/sorting.js', type: "module", included: false },
      { pattern: 'simple-implementations/hyper.js', type: "module", included: false },
      { pattern: 'simple-implementations/bitstream.js', type: "module", included: false },
      { pattern: 'simple-implementations/galois-field.js', type: "module", included: false },

      //test files
      { pattern: 'tests/array-tools-test.js', type: "module" },
      { pattern: 'tests/binary-tools-test.js', type: "module" },
      { pattern: 'tests/combinatorics-tools-test.js', type: "module" },
      { pattern: 'tests/color-tools-test.js', type: "module" },
      { pattern: 'tests/exception-tools-test.js', type: "module" },
      { pattern: 'tests/encoding-tools-test.js', type: "module" },
      { pattern: 'tests/geometry-tools-test.js', type: "module" },
      { pattern: 'tests/image-tools-test.js', type: "module" },
      { pattern: 'tests/linear-algebra-tools-test.js', type: "module" },
      { pattern: 'tests/math-tools-test.js', type: "module" },
      { pattern: 'tests/object-tools-test.js', type: "module" },
      { pattern: 'tests/string-tools-test.js', type: "module" },
      { pattern: 'tests/function-tools-test.js', type: "module" },
      { pattern: 'tests/tensor-tools-test.js', type: "module" },
      { pattern: 'tests/time-tools-test.js', type: "module" },
      { pattern: 'tests/dom-tools-test.js', type: "module" },
      { pattern: 'tests/number-tools-test.js', type: "module" },
      { pattern: 'tests/promise-tools-test.js', type: "module" },
      { pattern: 'tests/random-tools-test.js', type: "module" },
      { pattern: 'tests/regex-tools-test.js', type: "module" },
      { pattern: 'tests/tree-tools-test.js', type: "module" },
      { pattern: 'tests/hyper-test.js', type: "module" },
      { pattern: 'tests/bitstream-test.js', type: "module" },
      { pattern: 'tests/galois-field-test.js', type: "module" },
      { pattern: 'tests/stat-tools-test.js', type: "module" },
      { pattern: 'tests/value-tools-test.js', type: "module" },
      { pattern: 'tests/vector-tools-test.js', type: "module" },
      { pattern: 'tests/sorting-test.js', type: "module" }
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
