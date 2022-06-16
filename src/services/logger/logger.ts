import { Injectable } from "../../decorators/injectable.decorator";
import { colorCli, Colors } from "@utils/color-cli";
import { isPlainObject } from "@utils/shared.util";
import { LoggerLevel } from "./utils";

@Injectable()
export class Logger {
    private static lastTimestamp?: number;
    protected static instance?: typeof Logger = Logger;

    constructor(protected context?: string) {}

    public error(message: any, trace = "", context?: string): void {
        const instance = this.getInstance();

        instance && instance.error.call(instance, message, trace, context || this.context);
    }

    public log(message: any, context?: string): void {
        this.callFunction("log", message, context);
    }

    public info(message: any, context?: string): void {
        this.callFunction("info", message, context);
    }

    public warn(message: any, context?: string): void {
        this.callFunction("warn", message, context);
    }

    public debug(message: any, context?: string): void {
        this.callFunction("debug", message, context);
    }

    public verbose(message: any, context?: string): void {
        this.callFunction("verbose", message, context);
    }

    public static info(message: any, context = ""): void {
        this.printMessage(message, "green", context);
    }

    public static log(message: any, context = ""): void {
        this.printMessage(message, "green", context);
    }

    public static error(message: any, trace = "", context = ""): void {
        this.printMessage(message, "red", context, "stderr");

        this.printStackTrace(trace);
    }

    public static warn(message: any, context = ""): void {
        this.printMessage(message, "yellow", context);
    }

    public static debug(message: any, context = ""): void {
        this.printMessage(message, "blue", context);
    }

    public static getTimestamp(): string {
        const localeStringOptions = {
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            day: "2-digit",
            month: "2-digit",
        };

        return new Date(Date.now()).toLocaleString(
            undefined,
            localeStringOptions as Intl.DateTimeFormatOptions,
        );
    }

    private callFunction(name: LoggerLevel, message: any, context?: string): void {
        const instance = this.getInstance();
        const func = instance && instance[name];

        func && func.call(instance, message, context || this.context);
    }

    protected getInstance(): Logger | Logger | undefined {
        return new Logger(this.context);
    }

    private static printMessage(
        message: any,
        color: Colors,
        context = "",
        writeStreamType?: "stdout" | "stderr",
    ): void {
        const output = isPlainObject(message)
            ? `${colorCli("Object:", "green")} ${JSON.stringify(message)}\n`
            : colorCli(message, color);

        const pidMessage = colorCli(`[CORE] ${process.pid}   - `, "gray");
        const contextMessage = context ? colorCli(`[${context}] `, "blue") : "";
        const timestampDiff = this.updateAndGetTimestampDiff();
        const instance = (this.instance as typeof Logger) ?? Logger;
        const timestamp = instance.getTimestamp ? instance.getTimestamp() : Logger.getTimestamp?.();
        const computedMessage = `${pidMessage}${timestamp}   ${contextMessage}${output}${timestampDiff}\n`;

        process[writeStreamType ?? "stdout"].write(computedMessage);
    }

    private static updateAndGetTimestampDiff(): string {
        const includeTimestamp = Logger.lastTimestamp;
        const timestampDiff = Date.now() - (Logger.lastTimestamp || 0);
        const result = includeTimestamp ? colorCli(` +${timestampDiff}ms`, "yellow") : "";

        Logger.lastTimestamp = Date.now();

        return result;
    }

    private static printStackTrace(trace: string): void {
        if (!trace) {
            return;
        }

        process.stderr.write(`${trace}\n`);
    }
}
