///<reference path="node.d.ts" />
///<reference path="include.ts" />

class XError {
    public message: string;

    constructor(...tsargs) {
        Error.apply(this, arguments);
        return new Error();
    }
}

XError['prototype'] = new Error();

class TraceError {
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

class Device {
    public deviceRoot: string;
    public connected: boolean = false;

    public connect(deviceRootPath: string) {
        this.deviceRoot = deviceRootPath;

        this.connected = true;
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

    public readStringArray(property: string, deviceRoot?: string): string[]{
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
}