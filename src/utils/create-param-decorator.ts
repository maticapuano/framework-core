import { Constants } from "@enums/constants.enum";
import { RouteParamType } from "@enums/route-param-type.enum";
import { ParameterDecoratorMetadata } from "@interfaces/decorators/parameter-decorator-metadata";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";

export const createParamDecorator = (type: RouteParamType) => {
    return (name?: string, ...pipes: PipeTransform[] | Function[]): ParameterDecorator => {
        return (target: any, propertyKey: string | symbol, index: number) => {
            const metadata: ParameterDecoratorMetadata[] =
                Reflect.getMetadata("params", target, propertyKey) || [];

            metadata.push({
                target,
                type,
                name,
                index,
                propertyKey,
                pipes,
                paramType: Reflect.getMetadata("design:paramtypes", target, propertyKey)[index],
            });

            Reflect.defineMetadata(Constants.Params, metadata, target, propertyKey);
        };
    };
};
