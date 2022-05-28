import { Constants } from "@enums/constants.enum";
import { HttpStatus } from "@enums/http-status.enum";
import { RequestMethod } from "@enums/request-method.enum";
import { serializePath } from "./serialize-path";

export interface ControllerMetadata {
    route: string;
    method: RequestMethod;
    statusCode: HttpStatus;
    handler: Function;
}

export class MetadataResolver {
    public static getController(target: Function): ControllerMetadata[] {
        const controllerPath = Reflect.getMetadata(Constants.Controller, target);
        const metadata: any[] = Reflect.getMetadata(Constants.Request, target.prototype) || [];
        const controllerMetadata: ControllerMetadata[] = [];

        if (!controllerPath) {
            return [];
        }

        metadata.forEach(({ path, method, handler, ...rest }) => {
            const route = serializePath(`${controllerPath}/${path}`, true);

            controllerMetadata.push({
                route,
                method,
                handler,
                statusCode: rest.responseStatusCode,
            });
        });

        return controllerMetadata;
    }
}
