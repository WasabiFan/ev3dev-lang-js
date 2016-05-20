/// <reference path="../lib/node.d.ts" />
/// <reference path="../lib/bluebird.d.ts" />

import fs = require('fs');
import path = require('path');
var Promise: PromiseConstructor = null;
try {
    Promise = require('bluebird');
}
catch( e ) {
    // Promises are not available
}


class XError {
    public message: string;

    constructor(...tsargs) {
        Error.apply(this, arguments);
        return new Error();
    }
}

XError['prototype'] = new Error();

export class TraceError {
    public innerError: any;
    public message: string;

    constructor(message?: string, innerError?: any) {
        this.message = message;
        this.innerError = innerError;
    }

    public toString() {
        var str = this.message.trim() + '\r\nInner error:\r\n';

        var innerLines = this.innerError.toString().split('\r\n');
        for (var i in innerLines) {
            innerLines[i] = '  ' + innerLines[i];
        }
        return str + innerLines.join('\r\n');
    }
}

class EventNotificationRequest {
    private callbackFunction: (err?: Error) => void;
    private eventPredicate: (userData?: any) => boolean;
    private userData: any;
    private firstTriggerOnly: boolean;

    constructor(callbackFunction: (err?: Error) => void, eventPredicate: (userData?: any) => boolean, firstTriggerOnly: boolean = true, userData?: any) {
        this.callbackFunction = callbackFunction;
        this.eventPredicate = eventPredicate;
        this.userData = userData;

        this.firstTriggerOnly = firstTriggerOnly;
    }

    /**
     * Calls this event's predicate and invokes its callback if the
     * predicate signals for the event to fire. Returns a boolean
     * indicating whether the event should continue to be updated.
     */
    public handleUpdate(): boolean {

        var predicateResult: boolean;

        try {
            predicateResult = this.eventPredicate(this.userData)
        }
        catch (e) {
            this.callbackFunction(e);
            return false;
        }

        if (predicateResult) {
            this.callbackFunction();

            if (this.firstTriggerOnly)
                return false;
        }

        return true;
    }
}

export class Device {
    public static overrideSysClassDir: string = null;

    private static eventTimerInterval = 50;

    public deviceRoot: string;
    public deviceDirName: string;
    public connected: boolean = false;

    private sysClassDir: string = '/sys/class';

    private pendingEventRequests: EventNotificationRequest[] = [];
    private eventTimerCancellationToken: NodeJS.Timer = null;

    public connect(driverName: string, nameConvention?: string, propertyConstraints?: { [propertyName: string]: any }) {
        var nameRegex = nameConvention? new RegExp(nameConvention) : undefined;

        var deviceSearchDir = path.join(Device.overrideSysClassDir || this.sysClassDir, driverName);

        var availableDevices: string[];
        try {
            availableDevices = fs.readdirSync(deviceSearchDir);
        }
        catch (error) {
            return;
        }

        for (var deviceDirIndex in availableDevices) {
            var currentDeviceDirName = availableDevices[deviceDirIndex];

            if (nameRegex != undefined && !nameRegex.test(currentDeviceDirName)) {
                continue;
            }

            var currentDeviceDir = path.join(deviceSearchDir, currentDeviceDirName);

            var satisfiesConstraints: boolean = true;
            if (propertyConstraints != undefined) {
                for (var propName in propertyConstraints) {
                    var propertyValue = this.readProperty(propName, currentDeviceDir);
                    var constraintValue = propertyConstraints[propName];

                    if (constraintValue instanceof Array) {
                        if (constraintValue.indexOf(propertyValue) === -1) {
                            satisfiesConstraints = false;
                        }
                    }
                    else if (propertyValue != constraintValue) {
                        satisfiesConstraints = false;
                    }
                }
            }

            if (!satisfiesConstraints)
                continue;

            this.deviceRoot = currentDeviceDir;
            this.deviceDirName = currentDeviceDirName;
            this.connected = true;
        }
    }

    protected constructPropertyPath(property: string, deviceRoot?: string) {
        return path.join(deviceRoot || this.deviceRoot, property);
    }

    public readNumber(property: string, deviceRoot?: string): number {
        var value = this.readProperty(property, deviceRoot);

        if (typeof value !== 'number')
            return NaN;

        return value;
    }

    public readString(property: string, deviceRoot?: string): string {
        var value = this.readProperty(property, deviceRoot);
        return String(value);
    }

    public readStringAsType<T>(property: string, deviceRoot?: string): T {
        return <any>this.readString(property, deviceRoot) as T;
    }

    public readStringArray(property: string, deviceRoot?: string): string[] {
        return this.readString(property, deviceRoot)
            .split(' ')
            .map((value: string) => value.replace(/^\[|\]$/g, ''));
    }

    public readStringSelector(property: string, deviceRoot?: string): string {
        var bracketedParts = this.readString(property, deviceRoot)
            .split(' ')
            .filter((value: string) => value.match(/^\[|\]$/g) != null);

        if (bracketedParts.length <= 0)
            return null;

        return bracketedParts[0].replace(/^\[|\]$/g, '');
    }

    public readProperty(property: string, deviceRoot?: string): any {
        if (!deviceRoot && !this.connected)
            throw new Error('You must be connected to a device before you can read from it. This error probably means that the target device was not found.');

        var rawValue: string;
        var propertyPath = this.constructPropertyPath(property, deviceRoot);

        try {
            rawValue = fs.readFileSync(propertyPath).toString();
        }
        catch (e) {
            throw new TraceError('There was an error while reading from the property file "' + propertyPath + '".', e);
        }

        rawValue = rawValue.trim();
        var numValue = Number(rawValue);

        if (isNaN(numValue))
            return rawValue;
        else
            return numValue;
    }

    public setProperty(property: string, value: any): any {
        if (!this.connected)
            throw new Error('You must be connected to a device before you can write to it. This error probably means that the target device was not found.');

        var propertyPath = this.constructPropertyPath(property);

        try {
            fs.writeFileSync(propertyPath, value.toString());
        }
        catch (e) {
            throw new TraceError('There was an error while writing to the property file "' + propertyPath + '".', e);
        }
    }

    public setNumber(property: string, value: number) {
        this.setProperty(property, value);
    }

    public setString(property: string, value: string) {
        this.setProperty(property, value);
    }

    public set(propertyDefs: any) {
        for (var key in propertyDefs) {
            this.setProperty(key, propertyDefs[key]);
        }
    }

    private updatePendingEventRequests() {
        this.pendingEventRequests = this.pendingEventRequests.filter(
            (eventRequest, index, arr) =>
                eventRequest.handleUpdate());

        this.updateEventTimerState();
    }

    private updateEventTimerState() {
        if (this.pendingEventRequests.length > 0 && this.eventTimerCancellationToken == null) {
            this.eventTimerCancellationToken = setInterval(() => this.updatePendingEventRequests(), Device.eventTimerInterval);
        }
        else if (this.pendingEventRequests.length <= 0 && this.eventTimerCancellationToken != null) {
            clearInterval(this.eventTimerCancellationToken);
            this.eventTimerCancellationToken = null;
        }
    }
    
    public registerEventCallback(
        callbackFunction: (err?: Error, userData?: any) => void,
        eventPredicate: (userData?: any) => boolean,
        firstTriggerOnly: boolean = false,
        userCallbackData?: any) {

        var newEventRequest: EventNotificationRequest = new EventNotificationRequest(
            (err?) => {
                callbackFunction(err, userCallbackData);
            }, eventPredicate, firstTriggerOnly, userCallbackData);

        this.pendingEventRequests.push(newEventRequest);
        this.updateEventTimerState();
    }

    public registerEventPromise(eventPredicate: (userData?: any) => boolean, userCallbackData?: any): Promise<any> {
        if(Promise == null) {
            throw new Error("Promises are currently unavailable. Install the 'bluebird' package or use 'registerEventCallback(...)' instead.");
        }
        
        return new Promise((resolve, reject) => {
            this.registerEventCallback((err?) => {
                if (err)
                    reject(err);
                else
                    resolve(userCallbackData);

            }, eventPredicate, true, userCallbackData);
        });
    }
}

export class IndexedDevice extends Device {
    protected deviceIndexRegex = new RegExp("(\\d+)", "g");
    
    protected _deviceIndex: number = -1;
    get deviceIndex(): number {
        return this._deviceIndex;
    }

    constructor(driverTypeDirName: string, nameConvention?: string, targetAddress?: string, targetDriverName?: string | string[]) {
        super();

        var propertyConstraints: {[propertyName: string]: any} = {};

        if (targetAddress != undefined)
            propertyConstraints['address'] = targetAddress;

        if (targetDriverName != undefined)
            propertyConstraints['driver_name'] = [].concat(targetDriverName);

        this.connect(driverTypeDirName, nameConvention, propertyConstraints);

        if (this.connected) {
            var matches = this.deviceIndexRegex.exec(this.deviceDirName);
            
            if (matches != null && matches[0] != undefined) {
                this._deviceIndex = Number(matches[1]);
            }
        }
    }
}