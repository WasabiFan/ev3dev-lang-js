///<reference path="node.d.ts" />
///<reference path="include.ts" />
///<reference path="io.ts" />

//~autogen autogen-header
    // Sections of the following code were auto-generated based on spec v0.9.2-pre, rev 3. 
//~autogen

class MotorBase extends Device {
    protected port: string;
    protected deviceDir = '/sys/class/tacho-motor/'; //Default motor type

    protected _deviceIndex: number = -1;
    get deviceIndex(): number {
        return this._deviceIndex;
    }

    private motorBaseProperties = {
        portName: 'port_name',
        driver: 'driver_name'
    };

    constructor(targetPort: string, targetDriverName?: string) {
        super();

        this.port = targetPort;
        var rootPath: string;

        try {
            var availableDevices = fs.readdirSync(this.deviceDir);
            for (var i in availableDevices) {
                var deviceFile = availableDevices[i];

                rootPath = path.join(this.deviceDir, deviceFile);
                var currentPortName = this.readString(this.motorBaseProperties.portName, rootPath);
                var currentDriverName = this.readString(this.motorBaseProperties.driver, rootPath);

                var satisfiesCondition = (
                    (targetPort == ports.OUTPUT_AUTO)
                    || (targetPort == undefined)
                    || (currentPortName === targetPort)
                ) && (
                    (targetDriverName == undefined || targetDriverName == '')
                    || currentDriverName == targetDriverName
                );

                if (satisfiesCondition) {
                    this._deviceIndex = Number(deviceFile.substring('motor'.length));
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
}

//Tacho motor
class Motor extends MotorBase {

    constructor(port?: string, targetDriverName?: string) {
        this.deviceDir = '/sys/class/tacho-motor/';
    
        super(port, targetDriverName);
    }

    public reset() {
        this.command = 'reset';
    }

    //PROPERTIES
    //~autogen js_generic-get-set classes.motor>currentClass
    set command(value: string) {
        this.setString("command", value);
    }
    
    get commands(): string[] {
        return this.readString("commands").split(' ');
    }

    get countPerRot(): number {
        return this.readNumber("count_per_rot");
    }

    get driverName(): string {
        return this.readString("driver_name");
    }

    get dutyCycle(): number {
        return this.readNumber("duty_cycle");
    }

    get dutyCycleSp(): number {
        return this.readNumber("duty_cycle_sp");
    }
    set dutyCycleSp(value: number) {
        this.setNumber("duty_cycle_sp", value);
    }
    
    get encoderPolarity(): string {
        return this.readString("encoder_polarity");
    }
    set encoderPolarity(value: string) {
        this.setString("encoder_polarity", value);
    }
    
    get polarity(): string {
        return this.readString("polarity");
    }
    set polarity(value: string) {
        this.setString("polarity", value);
    }
    
    get portName(): string {
        return this.readString("port_name");
    }

    get position(): number {
        return this.readNumber("position");
    }
    set position(value: number) {
        this.setNumber("position", value);
    }
    
    get positionP(): number {
        return this.readNumber("hold_pid/Kp");
    }
    set positionP(value: number) {
        this.setNumber("hold_pid/Kp", value);
    }
    
    get positionI(): number {
        return this.readNumber("hold_pid/Ki");
    }
    set positionI(value: number) {
        this.setNumber("hold_pid/Ki", value);
    }
    
    get positionD(): number {
        return this.readNumber("hold_pid/Kd");
    }
    set positionD(value: number) {
        this.setNumber("hold_pid/Kd", value);
    }
    
    get positionSp(): number {
        return this.readNumber("position_sp");
    }
    set positionSp(value: number) {
        this.setNumber("position_sp", value);
    }
    
    get speed(): number {
        return this.readNumber("speed");
    }

    get speedSp(): number {
        return this.readNumber("speed_sp");
    }
    set speedSp(value: number) {
        this.setNumber("speed_sp", value);
    }
    
    get rampUpSp(): number {
        return this.readNumber("ramp_up_sp");
    }
    set rampUpSp(value: number) {
        this.setNumber("ramp_up_sp", value);
    }
    
    get rampDownSp(): number {
        return this.readNumber("ramp_down_sp");
    }
    set rampDownSp(value: number) {
        this.setNumber("ramp_down_sp", value);
    }
    
    get speedRegulationEnabled(): string {
        return this.readString("speed_regulation");
    }
    set speedRegulationEnabled(value: string) {
        this.setString("speed_regulation", value);
    }
    
    get speedRegulationP(): number {
        return this.readNumber("speed_pid/Kp");
    }
    set speedRegulationP(value: number) {
        this.setNumber("speed_pid/Kp", value);
    }
    
    get speedRegulationI(): number {
        return this.readNumber("speed_pid/Ki");
    }
    set speedRegulationI(value: number) {
        this.setNumber("speed_pid/Ki", value);
    }
    
    get speedRegulationD(): number {
        return this.readNumber("speed_pid/Kd");
    }
    set speedRegulationD(value: number) {
        this.setNumber("speed_pid/Kd", value);
    }
    
    get state(): string[] {
        return this.readString("state").split(' ');
    }

    get stopCommand(): string {
        return this.readString("stop_command");
    }
    set stopCommand(value: string) {
        this.setString("stop_command", value);
    }
    
    get stopCommands(): string[] {
        return this.readString("stop_commands").split(' ');
    }

    get timeSp(): number {
        return this.readNumber("time_sp");
    }
    set timeSp(value: number) {
        this.setNumber("time_sp", value);
    }
    

//~autogen
    
}

//DC Motor
class DCMotor extends MotorBase {

    constructor(port: string) {
        this.deviceDir = '/sys/class/dc-motor/';
    
        super(port);
    }

    //PROPERTIES

    //~autogen js_generic-get-set classes.dcMotor>currentClass
    get command(): string {
        return this.readString("command");
    }
    set command(value: string) {
        this.setString("command", value);
    }
    
    get commands(): string[] {
        return this.readString("commands").split(' ');
    }

    get driverName(): string {
        return this.readString("driver_name");
    }

    get dutyCycle(): number {
        return this.readNumber("duty_cycle");
    }

    get dutyCycleSp(): number {
        return this.readNumber("duty_cycle_sp");
    }
    set dutyCycleSp(value: number) {
        this.setNumber("duty_cycle_sp", value);
    }
    
    get polarity(): string {
        return this.readString("polarity");
    }
    set polarity(value: string) {
        this.setString("polarity", value);
    }
    
    get portName(): string {
        return this.readString("port_name");
    }

    get rampDownMs(): number {
        return this.readNumber("ramp_down_ms");
    }
    set rampDownMs(value: number) {
        this.setNumber("ramp_down_ms", value);
    }
    
    get rampUpMs(): number {
        return this.readNumber("ramp_up_ms");
    }
    set rampUpMs(value: number) {
        this.setNumber("ramp_up_ms", value);
    }
    

//~autogen
    }
    
//Servo Motor
class ServoMotor extends MotorBase {

    constructor(port: string) {
        this.deviceDir = '/sys/class/servo-motor/';
    
        super(port);
    }
    
    //PROPERTIES

    //~autogen js_generic-get-set classes.servoMotor>currentClass
    set command(value: string) {
        this.setString("command", value);
    }
    
    get driverName(): string {
        return this.readString("driver_name");
    }

    get maxPulseSp(): number {
        return this.readNumber("max_pulse_sp");
    }
    set maxPulseSp(value: number) {
        this.setNumber("max_pulse_sp", value);
    }
    
    get midPulseSp(): number {
        return this.readNumber("mid_pulse_sp");
    }
    set midPulseSp(value: number) {
        this.setNumber("mid_pulse_sp", value);
    }
    
    get minPulseSp(): number {
        return this.readNumber("min_pulse_sp");
    }
    set minPulseSp(value: number) {
        this.setNumber("min_pulse_sp", value);
    }
    
    get polarity(): string {
        return this.readString("polarity");
    }
    set polarity(value: string) {
        this.setString("polarity", value);
    }
    
    get portName(): string {
        return this.readString("port_name");
    }

    get positionSp(): number {
        return this.readNumber("position_sp");
    }
    set positionSp(value: number) {
        this.setNumber("position_sp", value);
    }
    
    get rateSp(): number {
        return this.readNumber("rate_sp");
    }
    set rateSp(value: number) {
        this.setNumber("rate_sp", value);
    }
    
    get state(): string[] {
        return this.readString("state").split(' ');
    }


//~autogen
}