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
      { pattern: 'libs/algorithms.js', type: "module" },
      { pattern: 'libs/array-tools.js', type: "module" },
      { pattern: 'libs/color-tools.js', type: "module" },
      { pattern: 'libs/string-tools.js', type: "module" },
      { pattern: 'libs/function-tools.js', type: "module" },
      { pattern: 'libs/time-tools.js', type: "module" },
      { pattern: 'libs/dom-tools.js', type: "module" },
      { pattern: 'simple-implementations/hyper.js', type: "module" },

      //test files
      { pattern: 'tests/array-tools/array-tools-test.js', type: "module" },
      { pattern: 'tests/color-tools/color-tools-test.js', type: "module" },
      { pattern: 'tests/string-tools/string-tools-test.js', type: "module" },
      { pattern: 'tests/function-tools/function-tools-test.js', type: "module" },
      { pattern: 'tests/time-tools/time-tools-test.js', type: "module" },
      { pattern: 'tests/dom-tools/dom-tools-test.js', type: "module" },
      { pattern: 'tests/hyper/hyper-test.js', type: "module" }
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
