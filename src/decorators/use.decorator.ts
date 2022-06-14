import { Constants } from "@enums/constants.enum";

export const Use = (...middlewares: Function[]): Function => {
    return (target: any, propertyKey?: string) => {
        const metadata = propertyKey
            ? Reflect.getMetadata(Constants.Middleware, target, propertyKey) || []
            : Reflect.getMetadata(Constants.Middleware, target) || [];
        const data = [...metadata, ...middlewares];

        propertyKey
            ? Reflect.defineMetadata(Constants.Middleware, data, target, propertyKey)
            : Reflect.defineMetadata(Constants.Middleware, [...metadata, ...middlewares], target);
    };
};
