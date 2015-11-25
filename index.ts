/*
 * This is a language binding for the ev3dev device APIs. More info at: https://github.com/ev3dev/ev3dev-lang
 * This library complies with spec v0.9.3.
 */

import io = require('./io');
import motors = require('./motors');
import sensors = require('./sensors');
import extras = require('./extras');
    
// Constants
export var INPUT_AUTO = undefined;
export var OUTPUT_AUTO = undefined;

export var INPUT_1 = 'in1';
export var INPUT_2 = 'in2';
export var INPUT_3 = 'in3';
export var INPUT_4 = 'in4';

export var OUTPUT_A = 'outA';
export var OUTPUT_B = 'outB';
export var OUTPUT_C = 'outC';
export var OUTPUT_D = 'outD';

// IO
export var Device = io.Device;

// Motors
export var Motor = motors.Motor;
export var DCMotor = motors.DCMotor;
export var LargeMotor = motors.LargeMotor;
export var MediumMotor = motors.MediumMotor;
export var MotorSpeedSp = motors.MotorSpeedSp;
export var ServoMotor = motors.ServoMotor;

// Sensors
export var Sensor = sensors.Sensor;
export var I2CSensor = sensors.I2CSensor;
export var TouchSensor = sensors.TouchSensor;

// Extras
export var PowerSupply = extras.PowerSupply;
export var LED = extras.LED;
export var LegoPort = extras.LegoPort;