var ev3dev = require('../bin/index.js');


console.log('Battery ------------');
var battery = new ev3dev.PowerSupply();

console.log(' Technology: ' + battery.technology);
console.log(' Type: ' + battery.type);

console.log(' Current (microamps): ' + battery.measuredCurrent);
console.log(' Current (amps): ' + battery.currentAmps);

console.log(' Voltage (microvolts): ' + battery.measuredVoltage);
console.log(' Voltage (volts): ' + battery.voltageVolts);

console.log(' Max voltage (microvolts): ' + battery.maxVoltage);
console.log(' Min voltage (microvolts): ' + battery.minVoltage);


console.log('--------------------')
console.log('LED ----------------');
console.log('fading LEDs from green to red...');

for (var i = 0; i < 1; i += 0.01) {
    var brightnessVal = Math.round(i * ev3dev.LED.redLeft.maxBrightness);
    var invertedBrightnessVal = -brightnessVal + ev3dev.LED.redLeft.maxBrightness;

    ev3dev.LED.redLeft.brightness = brightnessVal;
    ev3dev.LED.redRight.brightness = brightnessVal;

    ev3dev.LED.greenLeft.brightness = invertedBrightnessVal;
    ev3dev.LED.greenRight.brightness = invertedBrightnessVal;
    
    if(i % 0.1 == 0)
        console.log(i + '%');
    
    {   //Hack to sleep for time
        //    SHOULD NOT BE USED IN PRODUCTION CODE
        var start = new Date().getTime();
        while(new Date().getTime() < start + 100) {
            ;
        }
    }
}

console.log('done');

ev3dev.LED.allOff();

console.log('--------------------')
