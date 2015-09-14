﻿///<reference path="node.d.ts" />
///<reference path="include.ts" />
///<reference path="io.ts" />

//~autogen autogen-header
    // Sections of the following code were auto-generated based on spec v0.9.3-pre, rev 2. 
//~autogen

//~autogen js_generic-class-description classes.powerSupply>currentClass
/** 
 * A generic interface to read data from the system's power_supply class.
 * Uses the built-in legoev3-battery if none is specified.
 */
//~autogen
class PowerSupply extends Device {
    private powerDeviceDir = '/sys/class/power_supply/';
    public deviceName: string = 'legoev3-battery';

    get powerProperties(): any {
        return {
            currentNow: 'current_now',
            voltageNow: 'voltage_now',
            voltageMaxDesign: 'voltage_min_design',
            voltageMinDesign: 'voltage_max_design',
            technology: 'technology',
            type: 'type'
        };
    }

    constructor(deviceName: string) {
        super();

        if (deviceName != undefined)
            this.deviceName = deviceName;

        var rootPath: string;

        try {
            var availableDevices = fs.readdirSync(this.powerDeviceDir);


            if (availableDevices.indexOf(this.deviceName) == -1) {
                this.connected = false;
                return;
            }

            rootPath = path.join(this.powerDeviceDir, availableDevices[availableDevices.indexOf(this.deviceName)]);
        }

        catch (e) {
            console.log(e);
            this.connected = false;
            return;
        }

        this.connect(rootPath/*, [this.sensorProperties.portName]*/);
    }

    //PROPERTIES
    //~autogen js_generic-get-set classes.powerSupply>currentClass
    /**
     * The measured current that the battery is supplying (in microamps)
     */
    get measuredCurrent(): number {
        return this.readNumber("current_now");
    }

    /**
     * The measured voltage that the battery is supplying (in microvolts)
     */
    get measuredVoltage(): number {
        return this.readNumber("voltage_now");
    }

    /**
     */
    get maxVoltage(): number {
        return this.readNumber("voltage_max_design");
    }

    /**
     */
    get minVoltage(): number {
        return this.readNumber("voltage_min_design");
    }

    /**
     */
    get technology(): string {
        return this.readString("technology");
    }

    /**
     */
    get type(): string {
        return this.readString("type");
    }


//~autogen

    get voltageVolts(): number {
        return this.measuredVoltage / 1000000;
    }

    get currentAmps(): number {
        return this.measuredCurrent / 1000000;
    }

}

//~autogen js_generic-class-description classes.led>currentClass
/** 
 * Any device controlled by the generic LED driver.
 * See https://www.kernel.org/doc/Documentation/leds/leds-class.txt
 * for more details.
 */
//~autogen
class LED extends Device {
    private ledDeviceDir = '/sys/class/leds/';
    public deviceName: string;
    
    /**
     * Built-in left red EV3 LED
     */
    public static redLeft = new LED('ev3-left0:red:ev3dev');

    /**
     * Built-in right red EV3 LED
     */
    public static redRight = new LED('ev3-right0:red:ev3dev');

    /**
     * Built-in left green EV3 LED
     */
    public static greenLeft = new LED('ev3-left1:green:ev3dev');

    /**
     * Built-in right green EV3 LED
     */
    public static greenRight = new LED('ev3-right1:green:ev3dev');

    get ledProperties(): any {
        return {
            maxBrightness: 'max_brightness',
            brightness: 'brightness',
            trgger: 'trigger'
        };
    }

    constructor(deviceName: string) {
        super();

        //if (deviceName != undefined)
        this.deviceName = deviceName;

        var rootPath: string;

        try {
            var availableDevices = fs.readdirSync(this.ledDeviceDir);


            if (availableDevices.indexOf(this.deviceName) == -1) {
                this.connected = false;
                return;
            }

            rootPath = path.join(this.ledDeviceDir, availableDevices[availableDevices.indexOf(this.deviceName)]);
        }

        catch (e) {
            console.log(e);
            this.connected = false;
            return;
        }

        this.connect(rootPath);
    }

    //PROPERTIES

    //~autogen js_generic-get-set classes.led>currentClass
    /**
     * Returns the maximum allowable brightness value.
     */
    get maxBrightness(): number {
        return this.readNumber("max_brightness");
    }

    /**
     * Sets the brightness level. Possible values are from 0 to `max_brightness`.
     */
    get brightness(): number {
        return this.readNumber("brightness");
    }
    /**
     * Sets the brightness level. Possible values are from 0 to `max_brightness`.
     */
    set brightness(value: number) {
        this.setNumber("brightness", value);
    }
    
    /**
     * Returns a list of available triggers.
     */
    get triggers(): string[] {
        return this.readStringArray("trigger");
    }

    /**
     * Sets the led trigger. A trigger
     * is a kernel based source of led events. Triggers can either be simple or
     * complex. A simple trigger isn't configurable and is designed to slot into
     * existing subsystems with minimal additional code. Examples are the `ide-disk` and
     * `nand-disk` triggers.
     * 
     * Complex triggers whilst available to all LEDs have LED specific
     * parameters and work on a per LED basis. The `timer` trigger is an example.
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `on` and `off` time can
     * be specified via `delay_{on,off}` attributes in milliseconds.
     * You can change the brightness value of a LED independently of the timer
     * trigger. However, if you set the brightness value to 0 it will
     * also disable the `timer` trigger.
     */
    get trigger(): string {
        return this.readStringSelector("trigger");
    }
    /**
     * Sets the led trigger. A trigger
     * is a kernel based source of led events. Triggers can either be simple or
     * complex. A simple trigger isn't configurable and is designed to slot into
     * existing subsystems with minimal additional code. Examples are the `ide-disk` and
     * `nand-disk` triggers.
     * 
     * Complex triggers whilst available to all LEDs have LED specific
     * parameters and work on a per LED basis. The `timer` trigger is an example.
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `on` and `off` time can
     * be specified via `delay_{on,off}` attributes in milliseconds.
     * You can change the brightness value of a LED independently of the timer
     * trigger. However, if you set the brightness value to 0 it will
     * also disable the `timer` trigger.
     */
    set trigger(value: string) {
        this.setString("trigger", value);
    }
    
    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `on` time can
     * be specified via `delay_on` attribute in milliseconds.
     */
    get delayOn(): number {
        return this.readNumber("delay_on");
    }
    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `on` time can
     * be specified via `delay_on` attribute in milliseconds.
     */
    set delayOn(value: number) {
        this.setNumber("delay_on", value);
    }
    
    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `off` time can
     * be specified via `delay_off` attribute in milliseconds.
     */
    get delayOff(): number {
        return this.readNumber("delay_off");
    }
    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `off` time can
     * be specified via `delay_off` attribute in milliseconds.
     */
    set delayOff(value: number) {
        this.setNumber("delay_off", value);
    }
    

//~autogen

    /**
     * Sets the LED's brightness to the given percent (0-1) of the max value.
     */
    public get brightnessPct(): number{
        return this.brightness / this.maxBrightness;
    }

    public set brightnessPct(brightnessPct: number) {
        this.brightness = Math.round(this.maxBrightness * brightnessPct);
    }

    /**
     * Sets brightness to maximum value, turning the LED on
     */
    public on() {
        this.brightness = this.maxBrightness;
    }

    /**
     * Sets brightness to 0, turning the LED off
     */
    public off() {
        this.brightness = 0;
    }
    
    /**
     * Flashes the LED on a timer using the given intervals.
     */
    public flash(onInterval: number, offInterval: number) {
        this.trigger = 'timer';
        // TODO: Do we need to delay here?

        this.delayOn = onInterval;
        this.delayOff = offInterval;
    }
    
    //~autogen js_led-color-methods

    public static setRed(intensity: number) {
        this.mixColors(1 * (intensity || 1.0), 0 * (intensity || 1.0));
    }
    
    public static redOn() {
        this.setRed(1.0);
    }

    public static setGreen(intensity: number) {
        this.mixColors(0 * (intensity || 1.0), 1 * (intensity || 1.0));
    }
    
    public static greenOn() {
        this.setGreen(1.0);
    }

    public static setAmber(intensity: number) {
        this.mixColors(1 * (intensity || 1.0), 1 * (intensity || 1.0));
    }
    
    public static amberOn() {
        this.setAmber(1.0);
    }

    public static setOrange(intensity: number) {
        this.mixColors(1 * (intensity || 1.0), 0.5 * (intensity || 1.0));
    }
    
    public static orangeOn() {
        this.setOrange(1.0);
    }

    public static setYellow(intensity: number) {
        this.mixColors(0.5 * (intensity || 1.0), 1 * (intensity || 1.0));
    }
    
    public static yellowOn() {
        this.setYellow(1.0);
    }

//~autogen

    public static mixColors(redPercent: number, greenPercent: number) {
        this.redLeft.brightnessPct = redPercent;
        this.redRight.brightnessPct= redPercent;

        this.greenLeft.brightnessPct = greenPercent;
        this.greenRight.brightnessPct = greenPercent;
    }
    
    /**
     * Turns off all built-in EV3 LEDs
     */
    public static allOff() {
        this.mixColors(0, 0);
    }
}