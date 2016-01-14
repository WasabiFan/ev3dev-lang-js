var PythonShell = require('python-shell');
var assert = require('assert');
var path = require('path');

module.exports.cleanArena = function (callback) {
    PythonShell.run(__dirname + "/fake-sys/clean_arena.py", function (err) {
        if (err) throw err;

        callback();
    });
}

module.exports.populateArena = function (deviceConfiguration, callback) {
    module.exports.cleanArena(function () {
        var deviceParams = [];
        for (var addressKey in deviceConfiguration) {
            deviceParams.push(
                deviceConfiguration[addressKey].name
                + ":" + deviceConfiguration[addressKey].index
                + "@" + addressKey);
        }

        var shellOptions = {
            args: deviceParams
        };
        var populateShell = new PythonShell(__dirname + "/fake-sys/populate_arena.py", shellOptions);

        var pathMapping = {};
        populateShell.on("message", function (message) {
            if (message.indexOf("\t") === 0) {
                var splitMessage = message.trim().split("\t");

                assert.equal(splitMessage.length, 3);

                pathMapping[splitMessage[1]] = {
                    index: Number(splitMessage[0]),
                    path: splitMessage[2]
                }
            }
            else {
                throw new Error("Populate script returned unexpected data (probably an error message): " + message);
            }
        });

        populateShell.end(function (err) {
            if (err) throw err;

            callback(pathMapping);
        })
    })
}

module.exports.assertDeviceConnected = function (device, targetPath, targetIndex, targetAddress) {
    assert.equal(device.connected, true);

    if (targetIndex != undefined && targetIndex != null) {
        assert.equal(path.normalize(device.deviceRoot), path.normalize(targetPath));
    }

    if (targetIndex != undefined && targetIndex != null) {
        if (device.hasOwnProperty("deviceIndex")) {
            assert.equal(device.deviceIndex, targetIndex);
        }
        else {
            assert.fail(undefined, undefined, "Cannot assert that device is connected at a given index if this device doesn't have an index property.");
        }
    }

    if (targetAddress != undefined && targetAddress != null) {
        if (device.hasOwnProperty("address")) {
            assert.equal(device.address, targetAddress);
        }
        else {
            assert.fail(undefined, undefined, "Cannot assert that device is connected at a given address if this device doesn't have an address property.");
        }
    }
}