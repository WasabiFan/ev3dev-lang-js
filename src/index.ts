/*
 * This is a language binding for the ev3dev device APIs. More info at: https://github.com/ev3dev/ev3dev-lang
 * This library complies with spec v0.9.3.
 */

import io = require("./io");
import motors = require("./motors");
import sensors = require("./sensors");
import extras = require("./extras");

// Constants
export var INPUT_AUTO = undefined;
export var OUTPUT_AUTO = undefined;

export var INPUT_1 = "in1";
export var INPUT_2 = "in2";
export var INPUT_3 = "in3";
export var INPUT_4 = "in4";

export var OUTPUT_A = "outA";
export var OUTPUT_B = "outB";
export var OUTPUT_C = "outC";
export var OUTPUT_D = "outD";

// IO
export var Device = io.Device;

// Motors
export var Motor = motors.Motor;
export var DcMotor = motors.DcMotor;
export var LargeMotor = motors.LargeMotor;
export var MediumMotor = motors.MediumMotor;
export var MotorSpeedSp = motors.MotorSpeedSp;
export var ServoMotor = motors.ServoMotor;

//~autogen export-string-literal-types classes.motor>currentClass "motors">module
export module Motor {

    export type CommandValue = motors.Motor.CommandValue;
    export type EncoderPolarityValue = motors.Motor.EncoderPolarityValue;
    export type PolarityValue = motors.Motor.PolarityValue;
    export type SpeedRegulationValue = motors.Motor.SpeedRegulationValue;
    export type StopCommandValue = motors.Motor.StopCommandValue;
}
//~autogen

//~autogen export-string-literal-types classes.servoMotor>currentClass "motors">module
export module ServoMotor {

    export type CommandValue = motors.ServoMotor.CommandValue;
    export type PolarityValue = motors.ServoMotor.PolarityValue;
}
//~autogen

//~autogen export-string-literal-types classes.dcMotor>currentClass "motors">module
export module DcMotor {

    export type CommandValue = motors.DcMotor.CommandValue;
    export type PolarityValue = motors.DcMotor.PolarityValue;
    export type StopCommandValue = motors.DcMotor.StopCommandValue;
}
//~autogen

// Sensors
export var Sensor = sensors.Sensor;
export var I2CSensor = sensors.I2CSensor;
export var TouchSensor = sensors.TouchSensor;
export var ColorSensor = sensors.ColorSensor;
export var UltrasonicSensor = sensors.UltrasonicSensor;
export var GyroSensor = sensors.GyroSensor;
export var InfraredSensor = sensors.InfraredSensor;
export var SoundSensor = sensors.SoundSensor;
export var LightSensor = sensors.LightSensor;

// Extras
export var PowerSupply = extras.PowerSupply;
export var LED = extras.LED;
export var LEDGroup = extras.LEDGroup;
export var LegoPort = extras.LegoPort;

//~autogen led-platform-class platforms.ev3>currentPlatform "Ev3Leds">currentPlatformClassName
export class Ev3Leds {

    public static redLeft = new extras.LED("ev3:left:red:ev3dev");
    public static redRight = new extras.LED("ev3:right:red:ev3dev");
    public static greenLeft = new extras.LED("ev3:left:green:ev3dev");
    public static greenRight = new extras.LED("ev3:right:green:ev3dev");

    public static left = new extras.LEDGroup(Ev3Leds.redLeft, Ev3Leds.greenLeft);
    public static right = new extras.LEDGroup(Ev3Leds.redRight, Ev3Leds.greenRight);

    public static blackColor = [0, 0];
    public static redColor = [1, 0];
    public static greenColor = [0, 1];
    public static amberColor = [1, 1];
    public static orangeColor = [1, 0.5];
    public static yellowColor = [0.1, 1];

    public static get isConnected(): boolean {
        return Ev3Leds.redLeft.connected && Ev3Leds.redRight.connected && Ev3Leds.greenLeft.connected && Ev3Leds.greenRight.connected;
    }
}
//~autogen

//~autogen led-platform-class platforms.brickpi>currentPlatform "BrickpiLeds">currentPlatformClassName
export class BrickpiLeds {

    public static blueLed1 = new extras.LED("brickpi:led1:blue:ev3dev");
    public static blueLed2 = new extras.LED("brickpi:led2:blue:ev3dev");

    public static led1 = new extras.LEDGroup(BrickpiLeds.blueLed1);
    public static led2 = new extras.LEDGroup(BrickpiLeds.blueLed2);

    public static blackColor = [0];
    public static blueColor = [1];

    public static get isConnected(): boolean {
        return BrickpiLeds.blueLed1.connected && BrickpiLeds.blueLed2.connected;
    }
}
//~autogen