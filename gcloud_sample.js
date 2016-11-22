var gcloud = require('google-cloud');
var vision = gcloud.vision({
    projectId: 'pi-camera',
    keyFilename: './key.json'
});

/**
 * Uses the Vision API to detect labels in the given file.
 */
function detectLabels (inputFile, callback) {
    // Make a call to the Vision API to detect the labels
    vision.detectLabels(inputFile, { verbose: true }, function (err, labels) {
        if (err) {
            return callback(err);
        }
        console.log('result:', JSON.stringify(labels, null, 2));
        callback(null, labels);
    });
}

// Run the example
function main (inputFile, callback) {
    detectLabels(inputFile, function (err, labels) {
        if (err) {
            return callback(err);
        }

        console.log('Found label: ' + labels[0].desc + ' for ' + inputFile);
        callback(null, labels);
    });
}

if (module === require.main) {
    if (process.argv.length < 3) {
        console.log('Usage: node labelDetection <inputFile>');
        process.exit(1);
    }
    var inputFile = process.argv[2];
    main(inputFile, console.log);
}
