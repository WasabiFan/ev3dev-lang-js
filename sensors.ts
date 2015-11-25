import IO = require('./io');
import Device = IO.Device;

export class SensorBase extends Device {
    protected _deviceIndex: number = -1;
    get deviceIndex(): number {
        return this._deviceIndex;
    }

    constructor(deviceTypeDirName: string, nameConvention: string, targetPort?: string, targetDriverName?: string | string[]) {
        super();

        var propertyConstraints: { [propertyName: string]: any } = {};

        if (targetPort != undefined)
            propertyConstraints['port_name'] = targetPort;

        if (targetDriverName != undefined)
            propertyConstraints['device_name'] = [].concat(targetDriverName);

        this.connect(deviceTypeDirName, nameConvention, propertyConstraints);

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
 * that a sensor is plugged in to, you must look at the `port_name` attribute if
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
     * Returns the name of the port that the sensor is connected to, e.g. `ev3:in1`.
     * I2C sensors also include the I2C address (decimal), e.g. `ev3:in1:i2c8`.
     */
    get portName(): string {
        return this.readString("port_name");
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

//~autogen generic-class-description classes.touchSensor>currentClass
/** 
 * Touch Sensor
 */
//~autogen
export class TouchSensor extends Sensor {
    constructor(port?: string, driverNames?: string[]) {
        super(port, ["lego-ev3-touch", "lego-nxt-touch"]);
    }
}

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