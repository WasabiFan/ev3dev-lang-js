var ev3dev = require('../bin/index.js');

var greenANSI = "\033[42m";
var redANSI = "\033[41m";
var resetANSI = "\033[0m";

var touchSensor = new ev3dev.TouchSensor();
if (!touchSensor.connected) {
    console.error("No touch sensor could be found! Please verify that a touch sensor is plugged in and try again.");
    process.exit(1);
}

touchSensor.registerEventCallback(function(error, touchInfo) {
    if(error) throw error;
    console.log("Sensor is " + (touchInfo.lastPressed ? greenANSI + "PRESSED" : redANSI + "RELEASED") + resetANSI);
},
    function(userData) {
        var isPressed = touchSensor.isPressed;
        var changed = isPressed != userData.lastPressed;

        userData.lastPressed = isPressed;
        return changed;
    }, false, { lastPressed: false });
 
 console.log("Press the touch sensor to trigger the press event.");