var ev3dev = require('../bin/index.js');
var stoppedBlinkInterval = 200;

if(!ev3dev.Ev3Leds.isConnected) {
    console.error("This sample can only run on the EV3 brick. Other platforms are not supported by this script.");
    process.exit(1);
}

var motor = new ev3dev.Motor();

if(!motor.connected) {
    console.error("No valid motor was found. Please connect a tacho motor and try again.");
    process.exit(1);
}

console.log("Connected to motor " + motor.address);
motor.stopAction = motor.stopActionValues.coast;

console.log("Timer running... Rotate the motor and watch the on-board LEDs.");

setInterval(function() {
    
    if(motor.speed > 1) {
        var rpsSpeed = Math.min(Math.abs(motor.speed) / motor.countPerRot, 1);
        var ledColor = [rpsSpeed, 1 - rpsSpeed];
        ev3dev.Ev3Leds.left.setColor(ledColor);
        ev3dev.Ev3Leds.right.setColor(ledColor);
    }
    else {
        var blinkOn = (new Date()).getTime() % stoppedBlinkInterval > (stoppedBlinkInterval / 2);
        ev3dev.Ev3Leds.left.setColor([0, blinkOn? 0 : 1]);
        ev3dev.Ev3Leds.right.setColor([0, 1]);
    }
    
}, 80);
