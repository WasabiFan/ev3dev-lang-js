//~autogen autogen-header
// Sections of the following code were auto-generated based on spec v1.1.0.

//~autogen

import IO = require('./io');
import Device = IO.Device;

export class MotorBase extends Device {
    protected _deviceIndex: number = -1;
    get deviceIndex(): number {
        return this._deviceIndex;
    }

    constructor(driverTypeDirName: string, nameConvention: string, targetAddress?: string, targetDriverName?: string | string[]) {
        super();

        var propertyConstraints: {[propertyName: string]: any} = {};

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

//~autogen generic-class-description classes.motor>currentClass
/** 
 * The motor class provides a uniform interface for using motors with
 * positional and directional feedback such as the EV3 and NXT motors.
 * This feedback allows for precise control of the motors. This is the
 * most common type of motor, so we just call it `motor`.
 * 
 * The way to configure a motor is to set the '_sp' attributes when
 * calling a command or before. Only in 'run_direct' mode attribute
 * changes are processed immediately, in the other modes they only
 * take place when a new command is issued.
 */
//~autogen
export class Motor extends MotorBase {

    public constructor(port?: string, targetDriverName?: string[] | string) {
        //~autogen connect-super-call classes.motor>currentClass "port,targetDriverName">extraParams
        super('tacho-motor', '*', port,targetDriverName);
//~autogen
    }

    public reset() {
        this.command = 'reset';
    }

    public stop() {
        this.command = 'stop';
    }

    //PROPERTIES
    //~autogen generic-get-set classes.motor>currentClass
    /**
     * Returns the name of the port that this motor is connected to.
     */
    get address(): string {
        return this.readString("address");
    }

    /**
     * Sends a command to the motor controller. See `commands` for a list of
     * possible values.
     */
    set command(value: string) {
        this.setString("command", value);
    }
    
    /**
     * Returns a list of commands that are supported by the motor
     * controller. Possible values are `run-forever`, `run-to-abs-pos`, `run-to-rel-pos`,
     * `run-timed`, `run-direct`, `stop` and `reset`. Not all commands may be supported.
     * 
     * - `run-forever` will cause the motor to run until another command is sent.
     * - `run-to-abs-pos` will run to an absolute position specified by `position_sp`
     *   and then stop using the command specified in `stop_command`.
     * - `run-to-rel-pos` will run to a position relative to the current `position` value.
     *   The new position will be current `position` + `position_sp`. When the new
     *   position is reached, the motor will stop using the command specified by `stop_command`.
     * - `run-timed` will run the motor for the amount of time specified in `time_sp`
     *   and then stop the motor using the command specified by `stop_command`.
     * - `run-direct` will run the motor at the duty cycle specified by `duty_cycle_sp`.
     *   Unlike other run commands, changing `duty_cycle_sp` while running *will*
     *   take effect immediately.
     * - `stop` will stop any of the run commands before they are complete using the
     *   command specified by `stop_command`.
     * - `reset` will reset all of the motor parameter attributes to their default value.
     *   This will also have the effect of stopping the motor.
     */
    get commands(): string[] {
        return this.readStringArray("commands");
    }

    /**
     * Returns the number of tacho counts in one rotation of the motor. Tacho counts
     * are used by the position and speed attributes, so you can use this value
     * to convert rotations or degrees to tacho counts. (rotation motors only)
     */
    get countPerRot(): number {
        return this.readNumber("count_per_rot");
    }

    /**
     * Returns the number of tacho counts in one meter of travel of the motor. Tacho
     * counts are used by the position and speed attributes, so you can use this
     * value to convert from distance to tacho counts. (linear motors only)
     */
    get countPerM(): number {
        return this.readNumber("count_per_m");
    }

    /**
     * Returns the name of the driver that provides this tacho motor device.
     */
    get driverName(): string {
        return this.readString("driver_name");
    }

    /**
     * Returns the current duty cycle of the motor. Units are percent. Values
     * are -100 to 100.
     */
    get dutyCycle(): number {
        return this.readNumber("duty_cycle");
    }

    /**
     * Writing sets the duty cycle setpoint. Reading returns the current value.
     * Units are in percent. Valid values are -100 to 100. A negative value causes
     * the motor to rotate in reverse.
     */
    get dutyCycleSp(): number {
        return this.readNumber("duty_cycle_sp");
    }
    /**
     * Writing sets the duty cycle setpoint. Reading returns the current value.
     * Units are in percent. Valid values are -100 to 100. A negative value causes
     * the motor to rotate in reverse.
     */
    set dutyCycleSp(value: number) {
        this.setNumber("duty_cycle_sp", value);
    }
    
    /**
     * Sets the polarity of the rotary encoder. This is an advanced feature to all
     * use of motors that send inversed encoder signals to the EV3. This should
     * be set correctly by the driver of a device. It You only need to change this
     * value if you are using a unsupported device. Valid values are `normal` and
     * `inversed`.
     */
    get encoderPolarity(): string {
        return this.readString("encoder_polarity");
    }
    /**
     * Sets the polarity of the rotary encoder. This is an advanced feature to all
     * use of motors that send inversed encoder signals to the EV3. This should
     * be set correctly by the driver of a device. It You only need to change this
     * value if you are using a unsupported device. Valid values are `normal` and
     * `inversed`.
     */
    set encoderPolarity(value: string) {
        this.setString("encoder_polarity", value);
    }
    
    /**
     * Returns the number of tacho counts in the full travel of the motor. When
     * combined with the `count_per_m` atribute, you can use this value to
     * calculate the maximum travel distance of the motor. (linear motors only)
     */
    get fullTravelCount(): number {
        return this.readNumber("full_travel_count");
    }

    /**
     * Sets the polarity of the motor. With `normal` polarity, a positive duty
     * cycle will cause the motor to rotate clockwise. With `inversed` polarity,
     * a positive duty cycle will cause the motor to rotate counter-clockwise.
     * Valid values are `normal` and `inversed`.
     */
    get polarity(): string {
        return this.readString("polarity");
    }
    /**
     * Sets the polarity of the motor. With `normal` polarity, a positive duty
     * cycle will cause the motor to rotate clockwise. With `inversed` polarity,
     * a positive duty cycle will cause the motor to rotate counter-clockwise.
     * Valid values are `normal` and `inversed`.
     */
    set polarity(value: string) {
        this.setString("polarity", value);
    }
    
    /**
     * Returns the current position of the motor in pulses of the rotary
     * encoder. When the motor rotates clockwise, the position will increase.
     * Likewise, rotating counter-clockwise causes the position to decrease.
     * Writing will set the position to that value.
     */
    get position(): number {
        return this.readNumber("position");
    }
    /**
     * Returns the current position of the motor in pulses of the rotary
     * encoder. When the motor rotates clockwise, the position will increase.
     * Likewise, rotating counter-clockwise causes the position to decrease.
     * Writing will set the position to that value.
     */
    set position(value: number) {
        this.setNumber("position", value);
    }
    
    /**
     * The proportional constant for the position PID.
     */
    get positionP(): number {
        return this.readNumber("hold_pid/Kp");
    }
    /**
     * The proportional constant for the position PID.
     */
    set positionP(value: number) {
        this.setNumber("hold_pid/Kp", value);
    }
    
    /**
     * The integral constant for the position PID.
     */
    get positionI(): number {
        return this.readNumber("hold_pid/Ki");
    }
    /**
     * The integral constant for the position PID.
     */
    set positionI(value: number) {
        this.setNumber("hold_pid/Ki", value);
    }
    
    /**
     * The derivative constant for the position PID.
     */
    get positionD(): number {
        return this.readNumber("hold_pid/Kd");
    }
    /**
     * The derivative constant for the position PID.
     */
    set positionD(value: number) {
        this.setNumber("hold_pid/Kd", value);
    }
    
    /**
     * Writing specifies the target position for the `run-to-abs-pos` and `run-to-rel-pos`
     * commands. Reading returns the current value. Units are in tacho counts. You
     * can use the value returned by `counts_per_rot` to convert tacho counts to/from
     * rotations or degrees.
     */
    get positionSp(): number {
        return this.readNumber("position_sp");
    }
    /**
     * Writing specifies the target position for the `run-to-abs-pos` and `run-to-rel-pos`
     * commands. Reading returns the current value. Units are in tacho counts. You
     * can use the value returned by `counts_per_rot` to convert tacho counts to/from
     * rotations or degrees.
     */
    set positionSp(value: number) {
        this.setNumber("position_sp", value);
    }
    
    /**
     * Returns the maximum value that is accepted by the `speed_sp` attribute. This
     * may be slightly different than the maximum speed that a particular motor can
     * reach - it's the maximum theoretical speed.
     */
    get maxSpeed(): number {
        return this.readNumber("max_speed");
    }

    /**
     * Returns the current motor speed in tacho counts per second. Note, this is
     * not necessarily degrees (although it is for LEGO motors). Use the `count_per_rot`
     * attribute to convert this value to RPM or deg/sec.
     */
    get speed(): number {
        return this.readNumber("speed");
    }

    /**
     * Writing sets the target speed in tacho counts per second used for all `run-*`
     * commands except `run-direct`. Reading returns the current value. A negative
     * value causes the motor to rotate in reverse with the exception of `run-to-*-pos`
     * commands where the sign is ignored. Use the `count_per_rot` attribute to convert
     * RPM or deg/sec to tacho counts per second. Use the `count_per_m` attribute to
     * convert m/s to tacho counts per second.
     */
    get speedSp(): number {
        return this.readNumber("speed_sp");
    }
    /**
     * Writing sets the target speed in tacho counts per second used for all `run-*`
     * commands except `run-direct`. Reading returns the current value. A negative
     * value causes the motor to rotate in reverse with the exception of `run-to-*-pos`
     * commands where the sign is ignored. Use the `count_per_rot` attribute to convert
     * RPM or deg/sec to tacho counts per second. Use the `count_per_m` attribute to
     * convert m/s to tacho counts per second.
     */
    set speedSp(value: number) {
        this.setNumber("speed_sp", value);
    }
    
    /**
     * Writing sets the ramp up setpoint. Reading returns the current value. Units
     * are in milliseconds and must be positive. When set to a non-zero value, the
     * motor speed will increase from 0 to 100% of `max_speed` over the span of this
     * setpoint. The actual ramp time is the ratio of the difference between the
     * `speed_sp` and the current `speed` and max_speed multiplied by `ramp_up_sp`.
     */
    get rampUpSp(): number {
        return this.readNumber("ramp_up_sp");
    }
    /**
     * Writing sets the ramp up setpoint. Reading returns the current value. Units
     * are in milliseconds and must be positive. When set to a non-zero value, the
     * motor speed will increase from 0 to 100% of `max_speed` over the span of this
     * setpoint. The actual ramp time is the ratio of the difference between the
     * `speed_sp` and the current `speed` and max_speed multiplied by `ramp_up_sp`.
     */
    set rampUpSp(value: number) {
        this.setNumber("ramp_up_sp", value);
    }
    
    /**
     * Writing sets the ramp down setpoint. Reading returns the current value. Units
     * are in milliseconds and must be positive. When set to a non-zero value, the
     * motor speed will decrease from 0 to 100% of `max_speed` over the span of this
     * setpoint. The actual ramp time is the ratio of the difference between the
     * `speed_sp` and the current `speed` and max_speed multiplied by `ramp_down_sp`.
     */
    get rampDownSp(): number {
        return this.readNumber("ramp_down_sp");
    }
    /**
     * Writing sets the ramp down setpoint. Reading returns the current value. Units
     * are in milliseconds and must be positive. When set to a non-zero value, the
     * motor speed will decrease from 0 to 100% of `max_speed` over the span of this
     * setpoint. The actual ramp time is the ratio of the difference between the
     * `speed_sp` and the current `speed` and max_speed multiplied by `ramp_down_sp`.
     */
    set rampDownSp(value: number) {
        this.setNumber("ramp_down_sp", value);
    }
    
    /**
     * The proportional constant for the speed regulation PID.
     */
    get speedP(): number {
        return this.readNumber("speed_pid/Kp");
    }
    /**
     * The proportional constant for the speed regulation PID.
     */
    set speedP(value: number) {
        this.setNumber("speed_pid/Kp", value);
    }
    
    /**
     * The integral constant for the speed regulation PID.
     */
    get speedI(): number {
        return this.readNumber("speed_pid/Ki");
    }
    /**
     * The integral constant for the speed regulation PID.
     */
    set speedI(value: number) {
        this.setNumber("speed_pid/Ki", value);
    }
    
    /**
     * The derivative constant for the speed regulation PID.
     */
    get speedD(): number {
        return this.readNumber("speed_pid/Kd");
    }
    /**
     * The derivative constant for the speed regulation PID.
     */
    set speedD(value: number) {
        this.setNumber("speed_pid/Kd", value);
    }
    
    /**
     * Reading returns a list of state flags. Possible flags are
     * `running`, `ramping` `holding` and `stalled`.
     */
    get state(): string[] {
        return this.readStringArray("state");
    }

    /**
     * Reading returns the current stop command. Writing sets the stop command.
     * The value determines the motors behavior when `command` is set to `stop`.
     * Also, it determines the motors behavior when a run command completes. See
     * `stop_commands` for a list of possible values.
     */
    get stopCommand(): string {
        return this.readString("stop_command");
    }
    /**
     * Reading returns the current stop command. Writing sets the stop command.
     * The value determines the motors behavior when `command` is set to `stop`.
     * Also, it determines the motors behavior when a run command completes. See
     * `stop_commands` for a list of possible values.
     */
    set stopCommand(value: string) {
        this.setString("stop_command", value);
    }
    
    /**
     * Returns a list of stop modes supported by the motor controller.
     * Possible values are `coast`, `brake` and `hold`. `coast` means that power will
     * be removed from the motor and it will freely coast to a stop. `brake` means
     * that power will be removed from the motor and a passive electrical load will
     * be placed on the motor. This is usually done by shorting the motor terminals
     * together. This load will absorb the energy from the rotation of the motors and
     * cause the motor to stop more quickly than coasting. `hold` does not remove
     * power from the motor. Instead it actively try to hold the motor at the current
     * position. If an external force tries to turn the motor, the motor will 'push
     * back' to maintain its position.
     */
    get stopCommands(): string[] {
        return this.readStringArray("stop_commands");
    }

    /**
     * Writing specifies the amount of time the motor will run when using the
     * `run-timed` command. Reading returns the current value. Units are in
     * milliseconds.
     */
    get timeSp(): number {
        return this.readNumber("time_sp");
    }
    /**
     * Writing specifies the amount of time the motor will run when using the
     * `run-timed` command. Reading returns the current value. Units are in
     * milliseconds.
     */
    set timeSp(value: number) {
        this.setNumber("time_sp", value);
    }
    

//~autogen
    
    public applySpeedSp(newSp: number | MotorSpeedSp) {
        if (typeof newSp === "number") {
            this.applySpeedSp(new MotorSpeedSp(newSp));
        }
        else {
            this.speedRegulationEnabled = newSp.regulationEnabled;
            if (newSp.dutyCycleSp != undefined)
                this.dutyCycleSp = newSp.dutyCycleSp;
            if (newSp.speedSp != undefined)
                this.speedSp = newSp.speedSp;
        }
    }

    public sendCommand(commandName: string) {

        if (this.commands.indexOf(commandName) < 0)
            throw new Error('The command ' + commandName + ' is not supported by the device.');

        this.command = commandName;
    }

    public runForever(sp?: MotorSpeedSp | number) {
        if (sp != undefined)
            this.applySpeedSp(sp);

        this.sendCommand('run-forever');
    }

    public start(sp?: MotorSpeedSp | number) {
        this.runForever(sp);
    }

    public runToPosition(position?: number, speedSp?: MotorSpeedSp | number) {
        this.runToAbsolutePosition(position, speedSp);
    }

    public runToAbsolutePosition(position?: number, speedSp?: MotorSpeedSp | number) {
        if (speedSp != undefined)
            this.applySpeedSp(speedSp);
        if (position != undefined)
            this.positionSp = position;

        this.sendCommand('run-to-abs-pos');
    }

    public runForDistance(distance?: number, speedSp?: MotorSpeedSp | number) {
        this.runToRelativePosition(distance, speedSp);
    }

    public runToRelativePosition(relPos?: number, speedSp?: MotorSpeedSp | number) {
        if (speedSp != undefined)
            this.applySpeedSp(speedSp);
        if (relPos != undefined)
            this.positionSp = relPos;

        this.sendCommand('run-to-rel-pos');
    }
}

//~autogen generic-class-description classes.largeMotor>currentClass
/** 
 * EV3 large servo motor
 */
//~autogen
export class LargeMotor extends Motor {
    constructor(port?: string) {
        super(port, 'lego-ev3-l-motor');
    }
}

//~autogen generic-class-description classes.mediumMotor>currentClass
/** 
 * EV3 medium servo motor
 */
//~autogen
export class MediumMotor extends Motor {
    constructor(port?: string) {
        super(port, 'lego-ev3-m-motor');
    }
}

//~autogen generic-class-description classes.dcMotor>currentClass
/** 
 * The DC motor class provides a uniform interface for using regular DC motors
 * with no fancy controls or feedback. This includes LEGO MINDSTORMS RCX motors
 * and LEGO Power Functions motors.
 */
//~autogen
export class DCMotor extends MotorBase {

    constructor(port: string) {
        //~autogen connect-super-call classes.dcMotor>currentClass "port">extraParams
        super('dc-motor', 'motor(\\d*)', port);
//~autogen
    }

    //PROPERTIES

    //~autogen generic-get-set classes.dcMotor>currentClass
    /**
     * Returns the name of the port that this motor is connected to.
     */
    get address(): string {
        return this.readString("address");
    }

    /**
     * Sets the command for the motor. Possible values are `run-forever`, `run-timed` and
     * `stop`. Not all commands may be supported, so be sure to check the contents
     * of the `commands` attribute.
     */
    set command(value: string) {
        this.setString("command", value);
    }
    
    /**
     * Returns a list of commands supported by the motor
     * controller.
     */
    get commands(): string[] {
        return this.readStringArray("commands");
    }

    /**
     * Returns the name of the motor driver that loaded this device. See the list
     * of [supported devices] for a list of drivers.
     */
    get driverName(): string {
        return this.readString("driver_name");
    }

    /**
     * Shows the current duty cycle of the PWM signal sent to the motor. Values
     * are -100 to 100 (-100% to 100%).
     */
    get dutyCycle(): number {
        return this.readNumber("duty_cycle");
    }

    /**
     * Writing sets the duty cycle setpoint of the PWM signal sent to the motor.
     * Valid values are -100 to 100 (-100% to 100%). Reading returns the current
     * setpoint.
     */
    get dutyCycleSp(): number {
        return this.readNumber("duty_cycle_sp");
    }
    /**
     * Writing sets the duty cycle setpoint of the PWM signal sent to the motor.
     * Valid values are -100 to 100 (-100% to 100%). Reading returns the current
     * setpoint.
     */
    set dutyCycleSp(value: number) {
        this.setNumber("duty_cycle_sp", value);
    }
    
    /**
     * Sets the polarity of the motor. Valid values are `normal` and `inversed`.
     */
    get polarity(): string {
        return this.readString("polarity");
    }
    /**
     * Sets the polarity of the motor. Valid values are `normal` and `inversed`.
     */
    set polarity(value: string) {
        this.setString("polarity", value);
    }
    
    /**
     * Sets the time in milliseconds that it take the motor to ramp down from 100%
     * to 0%. Valid values are 0 to 10000 (10 seconds). Default is 0.
     */
    get rampDownSp(): number {
        return this.readNumber("ramp_down_sp");
    }
    /**
     * Sets the time in milliseconds that it take the motor to ramp down from 100%
     * to 0%. Valid values are 0 to 10000 (10 seconds). Default is 0.
     */
    set rampDownSp(value: number) {
        this.setNumber("ramp_down_sp", value);
    }
    
    /**
     * Sets the time in milliseconds that it take the motor to up ramp from 0% to
     * 100%. Valid values are 0 to 10000 (10 seconds). Default is 0.
     */
    get rampUpSp(): number {
        return this.readNumber("ramp_up_sp");
    }
    /**
     * Sets the time in milliseconds that it take the motor to up ramp from 0% to
     * 100%. Valid values are 0 to 10000 (10 seconds). Default is 0.
     */
    set rampUpSp(value: number) {
        this.setNumber("ramp_up_sp", value);
    }
    
    /**
     * Gets a list of flags indicating the motor status. Possible
     * flags are `running` and `ramping`. `running` indicates that the motor is
     * powered. `ramping` indicates that the motor has not yet reached the
     * `duty_cycle_sp`.
     */
    get state(): string[] {
        return this.readStringArray("state");
    }

    /**
     * Sets the stop command that will be used when the motor stops. Read
     * `stop_commands` to get the list of valid values.
     */
    set stopCommand(value: string) {
        this.setString("stop_command", value);
    }
    
    /**
     * Gets a list of stop commands. Valid values are `coast`
     * and `brake`.
     */
    get stopCommands(): string[] {
        return this.readStringArray("stop_commands");
    }

    /**
     * Writing specifies the amount of time the motor will run when using the
     * `run-timed` command. Reading returns the current value. Units are in
     * milliseconds.
     */
    get timeSp(): number {
        return this.readNumber("time_sp");
    }
    /**
     * Writing specifies the amount of time the motor will run when using the
     * `run-timed` command. Reading returns the current value. Units are in
     * milliseconds.
     */
    set timeSp(value: number) {
        this.setNumber("time_sp", value);
    }
    

//~autogen
}

//~autogen generic-class-description classes.servoMotor>currentClass
/** 
 * The servo motor class provides a uniform interface for using hobby type
 * servo motors.
 */
//~autogen
export class ServoMotor extends MotorBase {

    constructor(port: string) {
        //~autogen connect-super-call classes.servoMotor>currentClass "port">extraParams
        super('servo-motor', 'motor(\\d*)', port);
//~autogen
    }
    
    //PROPERTIES

    //~autogen generic-get-set classes.servoMotor>currentClass
    /**
     * Returns the name of the port that this motor is connected to.
     */
    get address(): string {
        return this.readString("address");
    }

    /**
     * Sets the command for the servo. Valid values are `run` and `float`. Setting
     * to `run` will cause the servo to be driven to the position_sp set in the
     * `position_sp` attribute. Setting to `float` will remove power from the motor.
     */
    set command(value: string) {
        this.setString("command", value);
    }
    
    /**
     * Returns the name of the motor driver that loaded this device. See the list
     * of [supported devices] for a list of drivers.
     */
    get driverName(): string {
        return this.readString("driver_name");
    }

    /**
     * Used to set the pulse size in milliseconds for the signal that tells the
     * servo to drive to the maximum (clockwise) position_sp. Default value is 2400.
     * Valid values are 2300 to 2700. You must write to the position_sp attribute for
     * changes to this attribute to take effect.
     */
    get maxPulseSp(): number {
        return this.readNumber("max_pulse_sp");
    }
    /**
     * Used to set the pulse size in milliseconds for the signal that tells the
     * servo to drive to the maximum (clockwise) position_sp. Default value is 2400.
     * Valid values are 2300 to 2700. You must write to the position_sp attribute for
     * changes to this attribute to take effect.
     */
    set maxPulseSp(value: number) {
        this.setNumber("max_pulse_sp", value);
    }
    
    /**
     * Used to set the pulse size in milliseconds for the signal that tells the
     * servo to drive to the mid position_sp. Default value is 1500. Valid
     * values are 1300 to 1700. For example, on a 180 degree servo, this would be
     * 90 degrees. On continuous rotation servo, this is the 'neutral' position_sp
     * where the motor does not turn. You must write to the position_sp attribute for
     * changes to this attribute to take effect.
     */
    get midPulseSp(): number {
        return this.readNumber("mid_pulse_sp");
    }
    /**
     * Used to set the pulse size in milliseconds for the signal that tells the
     * servo to drive to the mid position_sp. Default value is 1500. Valid
     * values are 1300 to 1700. For example, on a 180 degree servo, this would be
     * 90 degrees. On continuous rotation servo, this is the 'neutral' position_sp
     * where the motor does not turn. You must write to the position_sp attribute for
     * changes to this attribute to take effect.
     */
    set midPulseSp(value: number) {
        this.setNumber("mid_pulse_sp", value);
    }
    
    /**
     * Used to set the pulse size in milliseconds for the signal that tells the
     * servo to drive to the miniumum (counter-clockwise) position_sp. Default value
     * is 600. Valid values are 300 to 700. You must write to the position_sp
     * attribute for changes to this attribute to take effect.
     */
    get minPulseSp(): number {
        return this.readNumber("min_pulse_sp");
    }
    /**
     * Used to set the pulse size in milliseconds for the signal that tells the
     * servo to drive to the miniumum (counter-clockwise) position_sp. Default value
     * is 600. Valid values are 300 to 700. You must write to the position_sp
     * attribute for changes to this attribute to take effect.
     */
    set minPulseSp(value: number) {
        this.setNumber("min_pulse_sp", value);
    }
    
    /**
     * Sets the polarity of the servo. Valid values are `normal` and `inversed`.
     * Setting the value to `inversed` will cause the position_sp value to be
     * inversed. i.e `-100` will correspond to `max_pulse_sp`, and `100` will
     * correspond to `min_pulse_sp`.
     */
    get polarity(): string {
        return this.readString("polarity");
    }
    /**
     * Sets the polarity of the servo. Valid values are `normal` and `inversed`.
     * Setting the value to `inversed` will cause the position_sp value to be
     * inversed. i.e `-100` will correspond to `max_pulse_sp`, and `100` will
     * correspond to `min_pulse_sp`.
     */
    set polarity(value: string) {
        this.setString("polarity", value);
    }
    
    /**
     * Reading returns the current position_sp of the servo. Writing instructs the
     * servo to move to the specified position_sp. Units are percent. Valid values
     * are -100 to 100 (-100% to 100%) where `-100` corresponds to `min_pulse_sp`,
     * `0` corresponds to `mid_pulse_sp` and `100` corresponds to `max_pulse_sp`.
     */
    get positionSp(): number {
        return this.readNumber("position_sp");
    }
    /**
     * Reading returns the current position_sp of the servo. Writing instructs the
     * servo to move to the specified position_sp. Units are percent. Valid values
     * are -100 to 100 (-100% to 100%) where `-100` corresponds to `min_pulse_sp`,
     * `0` corresponds to `mid_pulse_sp` and `100` corresponds to `max_pulse_sp`.
     */
    set positionSp(value: number) {
        this.setNumber("position_sp", value);
    }
    
    /**
     * Sets the rate_sp at which the servo travels from 0 to 100.0% (half of the full
     * range of the servo). Units are in milliseconds. Example: Setting the rate_sp
     * to 1000 means that it will take a 180 degree servo 2 second to move from 0
     * to 180 degrees. Note: Some servo controllers may not support this in which
     * case reading and writing will fail with `-EOPNOTSUPP`. In continuous rotation
     * servos, this value will affect the rate_sp at which the speed ramps up or down.
     */
    get rateSp(): number {
        return this.readNumber("rate_sp");
    }
    /**
     * Sets the rate_sp at which the servo travels from 0 to 100.0% (half of the full
     * range of the servo). Units are in milliseconds. Example: Setting the rate_sp
     * to 1000 means that it will take a 180 degree servo 2 second to move from 0
     * to 180 degrees. Note: Some servo controllers may not support this in which
     * case reading and writing will fail with `-EOPNOTSUPP`. In continuous rotation
     * servos, this value will affect the rate_sp at which the speed ramps up or down.
     */
    set rateSp(value: number) {
        this.setNumber("rate_sp", value);
    }
    
    /**
     * Returns a list of flags indicating the state of the servo.
     * Possible values are:
     * * `running`: Indicates that the motor is powered.
     */
    get state(): string[] {
        return this.readStringArray("state");
    }


//~autogen
}

/**
 * Describes a setpoint for a motor's power/speed. Supports both
 * unregulated (raw power) and regulated (specific speed) modes.
 */
export class MotorSpeedSp {
    public regulationEnabled: string;
    public dutyCycleSp: number;
    public speedSp: number;

    constructor(dutyCycleSp?: number) {
        if (dutyCycleSp != undefined) {
            this.regulationEnabled = 'off';
            this.dutyCycleSp = dutyCycleSp;
        }
    }

    public static fromRegulated(speedSp: number): MotorSpeedSp {
        var setpoint = new MotorSpeedSp();
        setpoint.regulationEnabled = 'on';
        setpoint.speedSp = speedSp;

        return setpoint;
    }

    public static fromUnregulated(dutyCycleSp: number): MotorSpeedSp {
        var setpoint = new MotorSpeedSp();
        setpoint.regulationEnabled = 'off';
        setpoint.dutyCycleSp = dutyCycleSp;

        return setpoint;
    }
}