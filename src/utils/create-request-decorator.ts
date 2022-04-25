import { Constants } from "@enums/constants.enum";
import { RequestMethod } from "@enums/request-method.enum";
import { RequestDecoratorOptions } from "@interfaces/decorators/request-decorator-options";
import { serializePath } from "./serialize-path";

export const createRequest = (options: RequestDecoratorOptions): MethodDecorator => {
    const defaultPath = "/";
    const pathMetadata = options[Constants.Path];
    const path = pathMetadata && pathMetadata.length ? serializePath(pathMetadata) : defaultPath;
    const requestMethod = options[Constants.Method] || RequestMethod.GET;

    return (target: object, key: any, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata(Constants.Path, path, descriptor.value);
        Reflect.defineMetadata(Constants.Method, requestMethod, descriptor.value);

        return descriptor;
    };
};

export const createRequestDecorator = (method: RequestMethod) => {
    return (path?: string): MethodDecorator => {
        return createRequest({
            [Constants.Method]: method,
            [Constants.Path]: path,
        });
    };
};
