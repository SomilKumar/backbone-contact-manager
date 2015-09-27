module.exports = function(config) {
    config.set({

        basePath: '',

        files: [
            //Standard Libs
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            '.node_modules/angular-resource/angular-resource.js',
            './node_modules/angular-messages/angular-messages.js',
            './node_modules/angular-ui-router/build/angular-ui-router.js',
            './app/libs/ui-bootstrap-tpls-0.13.4.js',

            // Src Files
            './app/src/*.js',
            './app/src/commons/*.js',
            './app/src/contactProfile/*.js',

            // Test Files
            './app/test/commons/*.js',
            './app/test/mocks/*.js',
            './app/test/contactProfile/*.js',
        ],
        preprocessors: {
            //Coverage
            './app/src/*.js': ['coverage'],
            './app/src/commons/*.js': ['coverage'],
            './app/src/contactProfile/*.js': ['coverage'],
        },



        // add the coverage plugin
        plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-coverage', 'karma-ng-html2js-preprocessor'],
        // // add coverage to reporters
        reporters: ['progress', 'coverage'],
        
        // // tell karma how you want the coverage results
        coverageReporter: {
            type: 'html',
            // where to store the report
            dir: './app/testcoveragereport/'
        },

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,
        frameworks: ['jasmine'],

        browsers: ['Chrome'],

    });
};
