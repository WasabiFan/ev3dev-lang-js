import IO = require('./io');
import Device = IO.Device;

export class SensorBase extends Device {
    protected _deviceIndex: number = -1;
    get deviceIndex(): number {
        return this._deviceIndex;
    }

    constructor(driverTypeDirName: string, nameConvention: string, targetAddress?: string, targetDriverName?: string | string[]) {
        super();

        var propertyConstraints: { [propertyName: string]: any } = {};

        if (targetAddress != undefined)
            propertyConstraints['address'] = targetAddress;

        if (targetDriverName != undefined)
            propertyConstraints['driver_name'] = [].concat(targetDriverName);

        this.connect(driverTypeDirName, nameConvention, propertyConstraints);

        if (this.connected) {
            var matches = new RegExp(nameConvention).exec(this.deviceDirName);

            if (matches != null && matches[0] != undefined) {
                this._deviceIndex = Number(matches[1]);
            }
        }
    }
}

//~autogen generic-class-description classes.sensor>currentClass
/** 
 * The sensor class provides a uniform interface for using most of the
 * sensors available for the EV3. The various underlying device drivers will
 * create a `lego-sensor` device for interacting with the sensors.
 * 
 * Sensors are primarily controlled by setting the `mode` and monitored by
 * reading the `value<N>` attributes. Values can be converted to floating point
 * if needed by `value<N>` / 10.0 ^ `decimals`.
 * 
 * Since the name of the `sensor<N>` device node does not correspond to the port
 * that a sensor is plugged in to, you must look at the `address` attribute if
 * you need to know which port a sensor is plugged in to. However, if you don't
 * have more than one sensor of each type, you can just look for a matching
 * `driver_name`. Then it will not matter which port a sensor is plugged in to - your
 * program will still work.
 */
//~autogen
export class Sensor extends SensorBase {

    constructor(port?: string, driverNames?: string[]| string) {
        //~autogen connect-super-call classes.sensor>currentClass "port,driverNames">extraParams
        super('lego-sensor', 'sensor(\\d*)', port,driverNames);
//~autogen
        
    }

    public getValue(valueIndex: number): number {
        return this.readNumber("value" + valueIndex);
    }

    public getFloatValue(valueIndex: number): number {
        return this.getValue(valueIndex) / Math.pow(10, this.decimals);
    }

    //PROPERTIES
    //~autogen generic-get-set classes.sensor>currentClass
    /**
     * Returns the name of the port that the sensor is connected to, e.g. `ev3:in1`.
     * I2C sensors also include the I2C address (decimal), e.g. `ev3:in1:i2c8`.
     */
    get address(): string {
        return this.readString("address");
    }

    /**
     * Sends a command to the sensor.
     */
    set command(value: string) {
        this.setString("command", value);
    }
    
    /**
     * Returns a list of the valid commands for the sensor.
     * Returns -EOPNOTSUPP if no commands are supported.
     */
    get commands(): string[] {
        return this.readStringArray("commands");
    }

    /**
     * Returns the number of decimal places for the values in the `value<N>`
     * attributes of the current mode.
     */
    get decimals(): number {
        return this.readNumber("decimals");
    }

    /**
     * Returns the name of the sensor device/driver. See the list of [supported
     * sensors] for a complete list of drivers.
     */
    get driverName(): string {
        return this.readString("driver_name");
    }

    /**
     * Returns the current mode. Writing one of the values returned by `modes`
     * sets the sensor to that mode.
     */
    get mode(): string {
        return this.readString("mode");
    }
    /**
     * Returns the current mode. Writing one of the values returned by `modes`
     * sets the sensor to that mode.
     */
    set mode(value: string) {
        this.setString("mode", value);
    }
    
    /**
     * Returns a list of the valid modes for the sensor.
     */
    get modes(): string[] {
        return this.readStringArray("modes");
    }

    /**
     * Returns the number of `value<N>` attributes that will return a valid value
     * for the current mode.
     */
    get numValues(): number {
        return this.readNumber("num_values");
    }

    /**
     * Returns the units of the measured value for the current mode. May return
     * empty string
     */
    get units(): string {
        return this.readString("units");
    }


//~autogen
}

//~autogen sensor-helper-classes

/** 
 * Touch Sensor
 */
export class TouchSensor extends Sensor {
    constructor(port?: string) {
        super(port, ["lego-ev3-touch","lego-nxt-touch"]);
    }
    
    
    /**
     * A boolean indicating whether the current touch sensor is being
     * pressed.
     */
    get isPressed(): boolean {
        this.mode = 'TOUCH';
        return Boolean(this.getFloatValue(0));
    }
    
}

/** 
 * LEGO EV3 color sensor.
 */
export class ColorSensor extends Sensor {
    constructor(port?: string) {
        super(port, ["lego-ev3-color"]);
    }
    
    
    /**
     * Reflected light intensity as a percentage. Light on sensor is red.
     */
    get reflectedLightIntensity(): number {
        this.mode = 'COL-REFLECT';
        return Number(this.getFloatValue(0));
    }
    
    /**
     * Ambient light intensity. Light on sensor is dimly lit blue.
     */
    get ambientLightIntensity(): number {
        this.mode = 'COL-AMBIENT';
        return Number(this.getFloatValue(0));
    }
    
    /**
     * Color detected by the sensor, categorized by overall value.
     *   - 0: No color
     *   - 1: Black
     *   - 2: Blue
     *   - 3: Green
     *   - 4: Yellow
     *   - 5: Red
     *   - 6: White
     *   - 7: Brown
     */
    get color(): number {
        this.mode = 'COL-COLOR';
        return Number(this.getFloatValue(0));
    }
    
    /**
     * Red component of the detected color, in the range 0-1020.
     */
    get red(): number {
        this.mode = 'RGB-RAW';
        return Number(this.getFloatValue(0));
    }
    
    /**
     * Green component of the detected color, in the range 0-1020.
     */
    get green(): number {
        this.mode = 'RGB-RAW';
        return Number(this.getFloatValue(1));
    }
    
    /**
     * Blue component of the detected color, in the range 0-1020.
     */
    get blue(): number {
        this.mode = 'RGB-RAW';
        return Number(this.getFloatValue(2));
    }
    
}

/** 
 * LEGO EV3 ultrasonic sensor.
 */
export class UltrasonicSensor extends Sensor {
    constructor(port?: string) {
        super(port, ["lego-ev3-us","lego-nxt-us"]);
    }
    
    
    /**
     * Measurement of the distance detected by the sensor,
     * in centimeters.
     */
    get distanceCentimeters(): number {
        this.mode = 'US-DIST-CM';
        return Number(this.getFloatValue(0));
    }
    
    /**
     * Measurement of the distance detected by the sensor,
     * in inches.
     */
    get distanceInches(): number {
        this.mode = 'US-DIST-IN';
        return Number(this.getFloatValue(0));
    }
    
    /**
     * Value indicating whether another ultrasonic sensor could
     * be heard nearby.
     */
    get otherSensorPresent(): boolean {
        this.mode = 'US-LISTEN';
        return Boolean(this.getFloatValue(0));
    }
    
}

/** 
 * LEGO EV3 gyro sensor.
 */
export class GyroSensor extends Sensor {
    constructor(port?: string) {
        super(port, ["lego-ev3-gyro"]);
    }
    
    
    /**
     * The number of degrees that the sensor has been rotated
     * since it was put into this mode.
     */
    get angle(): number {
        this.mode = 'GYRO-ANG';
        return Number(this.getFloatValue(0));
    }
    
    /**
     * The rate at which the sensor is rotating, in degrees/second.
     */
    get rate(): number {
        this.mode = 'GYRO-RATE';
        return Number(this.getFloatValue(0));
    }
    
}

/** 
 * LEGO EV3 infrared sensor.
 */
export class InfraredSensor extends Sensor {
    constructor(port?: string) {
        super(port, ["lego-ev3-ir"]);
    }
    
    
    /**
     * A measurement of the distance between the sensor and the remote,
     * as a percentage. 100% is approximately 70cm/27in.
     */
    get proximity(): number {
        this.mode = 'IR-PROX';
        return Number(this.getFloatValue(0));
    }
    
}

/** 
 * LEGO NXT Sound Sensor
 */
export class SoundSensor extends Sensor {
    constructor(port?: string) {
        super(port, ["lego-nxt-sound"]);
    }
    
    
    /**
     * A measurement of the measured sound pressure level, as a
     * percent. Uses a flat weighting.
     */
    get soundPressure(): number {
        this.mode = 'DB';
        return Number(this.getFloatValue(0));
    }
    
    /**
     * A measurement of the measured sound pressure level, as a
     * percent. Uses A-weighting, which focuses on levels up to 55 dB.
     */
    get soundPressureLow(): number {
        this.mode = 'DBA';
        return Number(this.getFloatValue(0));
    }
    
}

/** 
 * LEGO NXT Light Sensor
 */
export class LightSensor extends Sensor {
    constructor(port?: string) {
        super(port, ["lego-nxt-light"]);
    }
    
    
    /**
     * A measurement of the reflected light intensity, as a percentage.
     */
    get reflectedLightIntensity(): number {
        this.mode = 'REFLECT';
        return Number(this.getFloatValue(0));
    }
    
    /**
     * A measurement of the ambient light intensity, as a percentage.
     */
    get ambientLightIntensity(): number {
        this.mode = 'AMBIENT';
        return Number(this.getFloatValue(0));
    }
    
}

//~autogen

//~autogen generic-class-description classes.i2cSensor>currentClass
/** 
 * A generic interface to control I2C-type EV3 sensors.
 */
//~autogen
export class I2CSensor extends Sensor {
    constructor(port?: string, driverNames?: string[]) {
        super(port, driverNames);
    }

    //~autogen generic-get-set classes.i2cSensor>currentClass
    /**
     * Returns the firmware version of the sensor if available. Currently only
     * I2C/NXT sensors support this.
     */
    get fwVersion(): string {
        return this.readString("fw_version");
    }

    /**
     * Returns the polling period of the sensor in milliseconds. Writing sets the
     * polling period. Setting to 0 disables polling. Minimum value is hard
     * coded as 50 msec. Returns -EOPNOTSUPP if changing polling is not supported.
     * Currently only I2C/NXT sensors support changing the polling period.
     */
    get pollMs(): number {
        return this.readNumber("poll_ms");
    }
    /**
     * Returns the polling period of the sensor in milliseconds. Writing sets the
     * polling period. Setting to 0 disables polling. Minimum value is hard
     * coded as 50 msec. Returns -EOPNOTSUPP if changing polling is not supported.
     * Currently only I2C/NXT sensors support changing the polling period.
     */
    set pollMs(value: number) {
        this.setNumber("poll_ms", value);
    }
    

//~autogen
}