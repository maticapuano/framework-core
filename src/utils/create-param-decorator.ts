import { Constants } from "@enums/constants.enum";
import { RouteParamType } from "@enums/route-param-type.enum";
import { ParameterDecoratorMetadata } from "@interfaces/decorators/parameter-decorator-metadata";

export const createParamDecorator = (type: RouteParamType) => {
    return (name?: string): ParameterDecorator => {
        return (target: any, propertyKey: string | symbol, index: number) => {
            const metadata: ParameterDecoratorMetadata[] =
                Reflect.getMetadata("params", target, propertyKey) || [];

            metadata.push({
                target,
                type,
                name,
                index,
                propertyKey,
            });

            Reflect.defineMetadata(Constants.Params, metadata, target, propertyKey);
        };
    };
};
