#!/usr/bin/node

var ev3dev = require('../bin/index.js');

// Run motor
console.log('Motor --------------');
// Pick the first connected motor
var motor = new ev3dev.Motor();

if (!motor.connected)
    console.log("No motor could be found. Are you sure that one is connected?");

console.log(' Port: ' + motor.portName);
console.log(' Driver: ' + motor.driverName);
console.log(' Available commands: ' + motor.commands);

console.log('Sending motor command...');

motor.rampUpSp = 100;
motor.rampDownSp = 100;
motor.runForTime(1000, ev3dev.MotorSpeedSp.fromUnregulated(50), 'brake');

do {
    console.log("Motor speed: " + motor.speed);
    
    {   //Hack to sleep for time
        //    SHOULD NOT BE USED IN PRODUCTION CODE
        var start = new Date().getTime();
        while (new Date().getTime() < start + 80) {
            ;
        }
    }
} while(motor.speed > 10);

console.log('--------------------');

//Read sensor
console.log('Sensor -------------');
// Pick the first connected sensor
var sensor = new ev3dev.Sensor();

if (!sensor.connected)
    console.log("No sensor could be found. Are you sure that one is connected?");

console.log(' Port: ' + sensor.portName);
console.log(' Driver: ' + sensor.driverName);

console.log('Reading all sensor values...');
for(var i = 0; i < sensor.numValues; i++) {
    console.log(' Value ' + i + ': ' + sensor.getValue(i) + ', ' + sensor.getFloatValue(i));
}
console.log('--------------------')
console.log("Core motor and sensor test complete");
