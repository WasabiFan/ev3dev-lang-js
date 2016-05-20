var assert = require('assert');
var ev3dev = require('../bin/index.js');
var utils = require('./test-utils.js');
var path = require('path');

var touchSensorData = {
    name: "touch_sensor",
    index: 0
}

describe('TouchSensor', function () {
    before(function () {
        ev3dev.Device.overrideSysClassDir = path.join(__dirname, "fake-sys", "arena");
    });

    it('should connect to a specified port', function (done) {
        utils.populateArena({
            "in1": touchSensorData
        }, function (pathMapping) {

            var currentSensor = new ev3dev.TouchSensor("in1");
            utils.assertDeviceConnected(currentSensor, pathMapping["in1"].path);

            done();
        });
    });

    it('should properly read touch state', function (done) {
        utils.populateArena({
            "in1": touchSensorData
        }, function (pathMapping) {
            
            var currentSensor = new ev3dev.TouchSensor("in1");

            utils.assertDeviceConnected(currentSensor, pathMapping["in1"].path);
            
            utils.setDeviceProperty(currentSensor, "value0", 0);
            assert.equal(currentSensor.isPressed, false, "sensor shouldn't be pressed");
            
            utils.setDeviceProperty(currentSensor, "value0", 1);
            assert.equal(currentSensor.isPressed, true, "sensor should be pressed");
            
            utils.setDeviceProperty(currentSensor, "value0", 0);
            assert.equal(currentSensor.isPressed, false, "sensor shouldn't be pressed");
            
            utils.setDeviceProperty(currentSensor, "value0", 1);
            assert.equal(currentSensor.isPressed, true, "sensor should be pressed");
            

            done();
        });
    });
});