///<reference path="node.d.ts" />
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

//~autogen js_generic-class-description classes.legoPort>currentClass
/** 
 * The `lego-port` class provides an interface for working with input and
 * output ports that are compatible with LEGO MINDSTORMS RCX/NXT/EV3, LEGO
 * WeDo and LEGO Power Functions sensors and motors. Supported devices include
 * the LEGO MINDSTORMS EV3 Intelligent Brick, the LEGO WeDo USB hub and
 * various sensor multiplexers from 3rd party manufacturers.
 * 
 * Some types of ports may have multiple modes of operation. For example, the
 * input ports on the EV3 brick can communicate with sensors using UART, I2C
 * or analog validate signals - but not all at the same time. Therefore there
 * are multiple modes available to connect to the different types of sensors.
 * 
 * In most cases, ports are able to automatically detect what type of sensor
 * or motor is connected. In some cases though, this must be manually specified
 * using the `mode` and `set_device` attributes. The `mode` attribute affects
 * how the port communicates with the connected device. For example the input
 * ports on the EV3 brick can communicate using UART, I2C or analog voltages,
 * but not all at the same time, so the mode must be set to the one that is
 * appropriate for the connected sensor. The `set_device` attribute is used to
 * specify the exact type of sensor that is connected. Note: the mode must be
 * correctly set before setting the sensor type.
 * 
 * Ports can be found at `/sys/class/lego-port/port<N>` where `<N>` is
 * incremented each time a new port is registered. Note: The number is not
 * related to the actual port at all - use the `port_name` attribute to find
 * a specific port.
 */
//~autogen
class LegoPort extends Device {
    private portDeviceDir = '/sys/class/lego-port/';
    protected port: string;

    protected _deviceIndex: number = -1;
    get deviceIndex(): number {
        return this._deviceIndex;
    }

    constructor(port: string) {
        super();

        this.port = port;
        var rootPath: string;

        try {
            var availableDevices = fs.readdirSync(this.portDeviceDir);
            for (var i in availableDevices) {
                var deviceFile = availableDevices[i];

                rootPath = path.join(this.portDeviceDir, deviceFile);
                var currentPortName = this.readString('port_name', rootPath);

                var satisfiesCondition = (
                    (port == ports.OUTPUT_AUTO || port == ports.INPUT_AUTO)
                    || (port == undefined)
                    || (currentPortName === port)
                    );

                if (satisfiesCondition) {
                    this._deviceIndex = Number(deviceFile.substring('lego-port'.length));
                    break;
                }
            }

            if (this.deviceIndex == -1) {
                console.log('no device found');
                this.connected = false;
                return;
            }
        }

        catch (e) {
            console.log(e);
            this.connected = false;
            return;
        }

        this.connect(rootPath);
    }

    //PROPERTIES
    //~autogen js_generic-get-set classes.legoPort>currentClass
    /**
     * Returns the name of the driver that loaded this device. You can find the
     * complete list of drivers in the [list of port drivers].
     */
    get driverName(): string {
        return this.readString("driver_name");
    }

    /**
     * Returns a list of the available modes of the port.
     */
    get modes(): string[] {
        return this.readStringArray("modes");
    }

    /**
     * Reading returns the currently selected mode. Writing sets the mode.
     * Generally speaking when the mode changes any sensor or motor devices
     * associated with the port will be removed new ones loaded, however this
     * this will depend on the individual driver implementing this class.
     */
    get mode(): string {
        return this.readString("mode");
    }
    /**
     * Reading returns the currently selected mode. Writing sets the mode.
     * Generally speaking when the mode changes any sensor or motor devices
     * associated with the port will be removed new ones loaded, however this
     * this will depend on the individual driver implementing this class.
     */
    set mode(value: string) {
        this.setString("mode", value);
    }
    
    /**
     * Returns the name of the port. See individual driver documentation for
     * the name that will be returned.
     */
    get portName(): string {
        return this.readString("port_name");
    }

    /**
     * For modes that support it, writing the name of a driver will cause a new
     * device to be registered for that driver and attached to this port. For
     * example, since NXT/Analog sensors cannot be auto-detected, you must use
     * this attribute to load the correct driver. Returns -EOPNOTSUPP if setting a
     * device is not supported.
     */
    set setDevice(value: string) {
        this.setString("set_device", value);
    }
    
    /**
     * In most cases, reading status will return the same value as `mode`. In
     * cases where there is an `auto` mode additional values may be returned,
     * such as `no-device` or `error`. See individual port driver documentation
     * for the full list of possible values.
     */
    get status(): string {
        return this.readString("status");
    }


//~autogen
}