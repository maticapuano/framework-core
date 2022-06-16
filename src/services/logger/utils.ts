import { colorCli } from "@utils/color-cli";

export type LoggerLevel = "info" | "log" | "debug" | "info" | "warn" | "error" | "verbose";

export type LoggerFunction = (message: string) => void;

export const logColorMap: Record<LoggerLevel, LoggerFunction> = {
    log: (message: string) => colorCli(message, "green"),
    debug: (message: string) => colorCli(message, "gray"),
    error: (message: string) => colorCli(message, "red"),
    warn: (message: string) => colorCli(message, "yellow"),
    info: (message: string) => colorCli(message, "blue"),
    verbose: (message: string) => colorCli(message, "cyan"),
};
