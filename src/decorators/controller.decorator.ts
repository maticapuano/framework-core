import { Constants } from "@enums/constants.enum";
import { serializePath } from "@utils/serialize-path";

export function Controller(): ClassDecorator;
export function Controller(path: string): ClassDecorator;
export function Controller(path?: string): ClassDecorator {
    const defaultPath = "/";

    path = path ? serializePath(path, true) : defaultPath;

    return (target: Function): void => {
        Reflect.defineMetadata(Constants.Controller, path, target);
    };
}
