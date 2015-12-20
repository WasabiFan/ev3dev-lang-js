var ev3dev = require('../bin/index.js');

var touchSensor = new ev3dev.TouchSensor();
if(!touchSensor.connected) {
    console.error("No touch sensor could be found! Please verify that a touch sensor is plugged in and try again.");
    process.exit(1);
}

var motor = new ev3dev.Motor();
if(!motor.connected) {
    console.error("No valid motor was found. Please connect a tacho motor and try again.");
    process.exit(1);
}

motor.speedRegulationEnabled = 'off';

console.log("Connected to touch sensor at address " + touchSensor.address + " and tacho motor at address " + motor.address);
console.log("Press the touch sensor to spin the motor.");

setInterval(function() {
    motor.dutyCycleSp = 100 * touchSensor.getValue(0);
    motor.command = 'run-forever';
}, 10);
