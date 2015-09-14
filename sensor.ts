///<reference path="node.d.ts" />
///<reference path="include.ts" />
///<reference path="io.ts" />

//~autogen js_generic-class-description classes.sensor>currentClass
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
class Sensor extends Device {
    private port: string;
    private sensorDeviceDir = '/sys/class/lego-sensor/';

    private _deviceIndex: number = -1;
    get deviceIndex(): number {
        return this._deviceIndex;
    }

    constructor(port?: string, driverNames?: string[]) {
        super();

        this.port = port;
        var rootPath: string;

        try {
            var availableDevices = fs.readdirSync(this.sensorDeviceDir);
            for (var i in availableDevices) {
                var file = availableDevices[i];

                rootPath = path.join(this.sensorDeviceDir, file);

                var portName = this.readString("port_name", rootPath);

                var driverName = this.readString("driver_name", rootPath);

                var satisfiesCondition = (
                        (port == ports.INPUT_AUTO)
                        || (port == undefined)
                        || (portName === port)
                    ) && (
                        (driverNames == undefined || driverNames == [])
                        || driverNames.indexOf(driverName) != -1
                    );
                
                if (satisfiesCondition) {
                    this._deviceIndex = Number(file.substring('sensor'.length));
                    break;
                }
            }

            if (this.deviceIndex == -1) {
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

    public getValue(valueIndex: number): number {
        return this.readNumber("value" + valueIndex);
    }

    public getFloatValue(valueIndex: number): number {
        return this.getValue(valueIndex) / Math.pow(10, this.decimals);
    }

    //PROPERTIES
    //~autogen js_generic-get-set classes.sensor>currentClass
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

//~autogen js_generic-class-description classes.i2cSensor>currentClass
/** 
 * A generic interface to control I2C-type EV3 sensors.
 */
//~autogen
class I2CSensor extends Sensor {
    constructor(port?: string, driverNames?: string[]) {
        super(port, driverNames);
    }

    //~autogen js_generic-get-set classes.i2cSensor>currentClass
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