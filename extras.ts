///<reference path="node.d.ts" />
///<reference path="include.ts" />
///<reference path="io.ts" />

//~autogen autogen-header
    // Sections of the following code were auto-generated based on spec v0.9.2-pre, rev 3. 
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

        if(deviceName != undefined)
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
    get measuredCurrent(): number {
        return this.readNumber("current_now");
    }

    get measuredVoltage(): number {
        return this.readNumber("voltage_now");
    }

    get maxVoltage(): number {
        return this.readNumber("voltage_max_design");
    }

    get minVoltage(): number {
        return this.readNumber("voltage_min_design");
    }

    get technology(): string {
        return this.readString("technology");
    }

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


class LED extends Device {
    private ledDeviceDir = '/sys/class/leds/';
    public deviceName: string;

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
    get maxBrightness(): number {
        return this.readNumber("max_brightness");
    }

    get brightness(): number {
        return this.readNumber("brightness");
    }
    set brightness(value: number) {
        this.setNumber("brightness", value);
    }
    
    get trigger(): string {
        return this.readString("trigger");
    }
    set trigger(value: string) {
        this.setString("trigger", value);
    }
    

//~autogen

}