///<reference path="node.d.ts" />
///<reference path="include.ts" />
///<reference path="io.ts" />

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
    set command(value: string) {
        this.setString("command", value);
    }
    
    get commands(): string[] {
        return this.readString("commands").split(' ');
    }

    get decimals(): number {
        return this.readNumber("decimals");
    }

    get driverName(): string {
        return this.readString("driver_name");
    }

    get mode(): string {
        return this.readString("mode");
    }
    set mode(value: string) {
        this.setString("mode", value);
    }
    
    get modes(): string[] {
        return this.readString("modes").split(' ');
    }

    get numValues(): number {
        return this.readNumber("num_values");
    }

    get portName(): string {
        return this.readString("port_name");
    }

    get units(): string {
        return this.readString("units");
    }


//~autogen
}

class I2CSensor extends Sensor {
    constructor(port?: string, driverNames?: string[]) {
        super(port, driverNames);
    }

    //~autogen js_generic-get-set classes.i2cSensor>currentClass
    get fwVersion(): string {
        return this.readString("fw_version");
    }

    get pollMs(): number {
        return this.readNumber("poll_ms");
    }
    set pollMs(value: number) {
        this.setNumber("poll_ms", value);
    }
    

//~autogen
}