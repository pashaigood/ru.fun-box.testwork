'use strict';

var resemble = require('node-resemble'),
    fs = require('fs'),
    mouseVisual = require('./mouseVisual');

function checkshot(name) {

    var screenshotBase = (browser.params['screenshotsBasePath'] || '.') + '/',

        pathToSrc = screenshotBase + name + '.png',
        pathToDiff = screenshotBase + 'runtime/' + name + '-diff.png',
        pathToCurrent = screenshotBase + 'runtime/' + name + '.png';

    if (!fs.existsSync(pathToSrc)) {
        throw new Error("Screenshot don't exists.\n" + pathToSrc);
    }
    else {
        try {
            fs.unlinkSync(pathToCurrent);
        }
        catch (e){}
        try {
            fs.unlinkSync(pathToDiff);
        }
        catch (e){}
    }

    function saveImge(img, pathToFile) {
        var buf = new Buffer(img, 'base64');
        fs.writeFileSync(pathToFile, buf, 'binary');
    }

    function compare(img) {
        mouseVisual.show();
        var imgSrc = fs.readFileSync(pathToSrc),
            imgCurrent = new Buffer(img, 'base64');

        var deferred = protractor.promise.defer();
        resemble(imgSrc).compareTo(imgCurrent).onComplete(function (data) {
            data.misMatchPercentage = parseFloat(data.misMatchPercentage);

            if (data.misMatchPercentage > 0) {
                saveImge(imgCurrent, pathToCurrent);
                saveImge(data.getImageDataUrl.call(data).replace(/^data:image\/png;base64/, ''), pathToDiff);
            }
            deferred.fulfill(data);
        });
        return deferred.promise;
    }
    mouseVisual.hide();
    browser.sleep(100);
    return browser.takeScreenshot().then(compare);
}


module.exports = {
    matchers: {
        toCheckshot: function (tolerance) {
            tolerance = tolerance || 0;
            var self = this;

            return checkshot(this.actual).then(function (result) {
                if (result.misMatchPercentage <= tolerance) {
                    return true;
                }
                else {
                    self.message = function() {
                        return "Expected mismatch to be 0 but it is " + result.misMatchPercentage;
                    };
                    return false;
                }
            });

            // for jasmine 2
            /*
            return {
                compare: function (actual, expected) {
                    return {
                        pass: checkshot(actual).then(function (result) {
                            return parseFloat(result.misMatchPercentage) == 0;
                        })
                    };
                }
            };
            */
        }
    }
};

beforeEach(function () {
    this.addMatchers(module.exports.matchers);
});
