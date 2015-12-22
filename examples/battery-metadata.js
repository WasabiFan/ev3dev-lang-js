var ev3dev = require('../bin/index.js');

function printBatteryInfo(label, battery) {
	console.log(label + " --------------");
	
	if(battery.connected) {	
		console.log('  Technology: ' + battery.technology);
		console.log('  Type: ' + battery.type);
		
		console.log('  Current (microamps): ' + battery.measuredCurrent);
		console.log('  Current (amps): ' + battery.currentAmps);
		
		console.log('  Voltage (microvolts): ' + battery.measuredVoltage);
		console.log('  Voltage (volts): ' + battery.voltageVolts);
		
		console.log('  Max voltage (microvolts): ' + battery.maxVoltage);
		console.log('  Min voltage (microvolts): ' + battery.minVoltage);
	}
	else
	    console.log("  Battery not connected!");
}

var defaultBattery = new ev3dev.PowerSupply();
printBatteryInfo("Default battery", defaultBattery);