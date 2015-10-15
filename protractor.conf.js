'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;

// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:3000',

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: [paths.e2e + '/**/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    onPrepare: function () {

        require('./e2e/checkshot');
        require('./e2e/mouseVisual');
        require('./e2e/resize').setViewportSize(800, 600);

    },
    params: {
        screenshotsBasePath: 'e2e/screenshots',
        viewport: {
            width: 800,
            height: 600
        }
    }
};
