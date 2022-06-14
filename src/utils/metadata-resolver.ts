import { Constants } from "@enums/constants.enum";
import { HttpStatus } from "@enums/http-status.enum";
import { RequestMethod } from "@enums/request-method.enum";
import { container } from "@injector/container";
import { ParameterDecoratorMetadata } from "@interfaces/decorators/parameter-decorator-metadata";
import { serializePath } from "./serialize-path";

interface HeaderMetadata {
    key: string;
    value: string;
    propertyKey: string;
}

export interface ControllerMetadata {
    route: string;
    method: RequestMethod;
    statusCode: HttpStatus;
    handler: Function;
    propertyKey: string;
    originalTarget: Function;
    headers: HeaderMetadata[];
    parameters: ParameterDecoratorMetadata[];
    middlewares: Function[];
}

export class MetadataResolver {
    public static getController(target: Function): ControllerMetadata[] {
        const controllerPath = Reflect.getMetadata(Constants.Controller, target);
        const metadata: any[] = Reflect.getMetadata(Constants.Request, target.prototype) || [];
        const controllerMetadata: ControllerMetadata[] = [];

        if (!controllerPath) {
            return [];
        }

        const middlewares = Reflect.getMetadata(Constants.Middleware, target) || [];

        metadata.forEach(({ path, method, handler, ...rest }) => {
            const parameters =
                Reflect.getMetadata(Constants.Params, target.prototype, rest.propertyKey) || [];
            const route = serializePath(`${controllerPath}/${path}`, true);

            const middlewaresByPropertyKey =
                Reflect.getMetadata(Constants.Middleware, target.prototype, rest.propertyKey) || [];

            if (middlewaresByPropertyKey.length > 0) {
                middlewares.push(...middlewaresByPropertyKey);
            }

            controllerMetadata.push({
                route,
                method,
                handler,
                statusCode: rest.responseStatusCode,
                originalTarget: target,
                parameters,
                middlewares,
                ...rest,
            });
        });

        container.register(target.name, target);

        return controllerMetadata;
    }
}
