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
var leds = [];
[   'ev3:green:left',  'ev3:red:left',
    'ev3:green:right', 'ev3:red:right'
].forEach(function (value) {
    leds.push(new ev3dev.LED(value));
});

for(var i = 0; i < 100; i++) {
    for(var ledI = 0; ledI < leds.length; ledI++) {
        var val = (i / 100) * leds[ledI].maxBrightness;
        if(ledI % 2 == 0)
            val = (100 - i) / 100 * leds[ledI].maxBrightness; 
        
        leds[ledI].brightness = Math.round(val);
    }
    
    if(i % 10 == 0)
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

for(var i in leds) {
    leds[i].brightness = 0;
}

console.log('--------------------')