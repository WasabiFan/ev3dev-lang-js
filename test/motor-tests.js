var assert = require('assert');
var ev3dev = require('../bin/index.js');
var utils = require('./test-utils.js');
var path = require('path');

var motorData = {
    name: "medium_motor",
    index: 0
}

describe('Motor', function () {
    this.timeout(4000);
    
    before(function () {
        ev3dev.Device.overrideSysClassDir = path.join(__dirname, "fake-sys", "arena");
    });

    it('should connect to a specified port', function (done) {
        utils.populateArena({
            "outA": motorData
        }, function (pathMapping) {

            var currentMotor = new ev3dev.Motor("outA");
            utils.assertDeviceConnected(currentMotor, pathMapping["outA"].path);

            done();
        });
    });

    it('should properly set properties', function (done) {
        utils.populateArena({
            "outA": motorData
        }, function (pathMapping) {
            
            var currentMotor = new ev3dev.Motor("outA");
            utils.assertDeviceConnected(currentMotor, pathMapping["outA"].path);
            
            currentMotor.speedSp = 400;
            assert.equal(utils.getDeviceProperty(currentMotor, "speed_sp"), 400);
            
            currentMotor.command = "run-forever";
            assert.equal(utils.getDeviceProperty(currentMotor, "command"), "run-forever");
            
            currentMotor.rampDownSp = 150;
            assert.equal(utils.getDeviceProperty(currentMotor, "ramp_down_sp"), 150);
            
            done();
        });
    });
    
    it('should properly read properties', function (done) {
        utils.populateArena({
            "outA": motorData
        }, function (pathMapping) {
            
            var currentMotor = new ev3dev.Motor("outA");
            utils.assertDeviceConnected(currentMotor, pathMapping["outA"].path);
            
            utils.setDeviceProperty(currentMotor, "speed", 300);
            assert.equal(currentMotor.speed, 300);
            
            utils.setDeviceProperty(currentMotor, "polarity", "inversed");
            assert.equal(currentMotor.polarity, "inversed");
            
            utils.setDeviceProperty(currentMotor, "commands", "run-forever run-timed run-direct");
            assert.deepEqual(currentMotor.commands, ["run-forever", "run-timed", "run-direct"]);
            
            done();
        });
    });
    
    it('should properly start motor via helper functions', function (done) {
        utils.populateArena({
            "outA": motorData
        }, function (pathMapping) {
            
            var currentMotor = new ev3dev.Motor("outA");
            utils.assertDeviceConnected(currentMotor, pathMapping["outA"].path);
            
            currentMotor.start(700, currentMotor.stopActionValues.hold);
            assert.equal(utils.getDeviceProperty(currentMotor, "speed_sp"), 700);
            assert.equal(utils.getDeviceProperty(currentMotor, "command"), "run-forever");
            assert.equal(utils.getDeviceProperty(currentMotor, "stop_action"), "hold");

            currentMotor.runForDistance(720, 800, currentMotor.stopActionValues.brake);
            assert.equal(utils.getDeviceProperty(currentMotor, "position_sp"), 720);
            assert.equal(utils.getDeviceProperty(currentMotor, "speed_sp"), 800);
            assert.equal(utils.getDeviceProperty(currentMotor, "stop_action"), "brake");
            assert.equal(utils.getDeviceProperty(currentMotor, "command"), "run-to-rel-pos");
            
            currentMotor.runToPosition(150, 900, currentMotor.stopActionValues.coast);
            assert.equal(utils.getDeviceProperty(currentMotor, "position_sp"), 150);
            assert.equal(utils.getDeviceProperty(currentMotor, "speed_sp"), 900);
            assert.equal(utils.getDeviceProperty(currentMotor, "stop_action"), "coast");
            assert.equal(utils.getDeviceProperty(currentMotor, "command"), "run-to-abs-pos");
            
            currentMotor.runForTime(2000, 1000, currentMotor.stopActionValues.hold);
            assert.equal(utils.getDeviceProperty(currentMotor, "time_sp"), 2000);
            assert.equal(utils.getDeviceProperty(currentMotor, "speed_sp"), 1000);
            assert.equal(utils.getDeviceProperty(currentMotor, "stop_action"), "hold");
            assert.equal(utils.getDeviceProperty(currentMotor, "command"), "run-timed");

            done();
        });
    });
    
    it('should expose constants for string properties', function (done) {
        utils.populateArena({
            "outA": motorData
        }, function (pathMapping) {
            
            var currentMotor = new ev3dev.Motor("outA");
            utils.assertDeviceConnected(currentMotor, pathMapping["outA"].path);
            
            // Sampling of values; if one of them is broken, they all probably are.
            assert.equal(currentMotor.commandValues.runForever, "run-forever");
            assert.equal(currentMotor.encoderPolarityValues.inversed, "inversed");

            done();
        });
    });
});