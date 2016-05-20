var assert = require('assert');
var ev3dev = require('../bin/index.js');
var utils = require('./test-utils.js');
var path = require('path');

var touchSensorData = {
    name: "touch_sensor",
    index: 0
}

describe('Device', function () {
    before(function () {
        ev3dev.Device.overrideSysClassDir = path.join(__dirname, "fake-sys", "arena");
    });

    it('should connect to any device if no criteria are provided', function (done) {
        utils.populateArena({
            "in1": touchSensorData
        }, function (pathMapping) {

            var currentDevice = new ev3dev.Device();
            currentDevice.connect("lego-sensor", "sensor(\\d*)");

            utils.assertDeviceConnected(currentDevice, pathMapping["in1"].path);

            done();
        });
    });

    it('should connect to a specific device if a single criterion is specified', function (done) {
        utils.populateArena({
            "in3": touchSensorData
        }, function (pathMapping) {

            var currentDevice = new ev3dev.Device();
            currentDevice.connect("lego-sensor", "sensor(\\d*)", {
                address: "in3"
            });

            utils.assertDeviceConnected(currentDevice, pathMapping["in3"].path);

            done();
        });
    });

    it('should not connect to any device if no devices matching criteria are found', function (done) {
        utils.populateArena({
            "in3": touchSensorData
        }, function (pathMapping) {

            var currentDevice = new ev3dev.Device();
            currentDevice.connect("lego-sensor", "sensor(\\d*)", {
                address: "thisDoesntExist"
            });

            assert.equal(currentDevice.connected, false);

            done();
        });
    });
});

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