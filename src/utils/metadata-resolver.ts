import { Constants } from "@enums/constants.enum";
import { RequestMethod } from "@enums/request-method.enum";
import { serializePath } from "./serialize-path";

export interface ControllerMetadata {
    route: string;
    method: RequestMethod;
    handler: Function;
}

export class MetadataResolver {
    public static getController(target: Function): ControllerMetadata[] {
        const controllerPath = Reflect.getMetadata(Constants.Controller, target);
        const metadata: any[] = Reflect.getMetadata(Constants.Request, target.prototype) || [];
        const controllerMetadata: ControllerMetadata[] = [];

        metadata.forEach(({ path, method, handler }) => {
            const route = serializePath(`${controllerPath}/${path}`, true);

            controllerMetadata.push({
                route,
                method,
                handler,
            });
        });

        return controllerMetadata;
    }
}
