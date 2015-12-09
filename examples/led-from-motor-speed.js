var ev3dev = require('../bin/index.js');

if(!ev3dev.Ev3Leds.isConnected) {
    console.error("This sample can only run on the EV3 brick. Other platforms are not supported by this script.");
    process.exit(1);
}

var motor = new ev3dev.Motor();

if(!motor.connected) {
    console.error("No valid motor was found. Please connect a tacho motor and try again.");
    process.exit(1);
}

console.log("Connected to motor " + motor.portName);
console.log("Timer running... Rotate the motor and watch the on-board LEDs.");

setInterval(function() {
    var rpsSpeed = Math.abs(motor.speed) / motor.countPerRot;
    
    var ledColor = [rpsSpeed, 1 - rpsSpeed];
    ev3dev.Ev3Leds.left.setColor(ledColor);
    ev3dev.Ev3Leds.right.setColor(ledColor);
}, 10);
