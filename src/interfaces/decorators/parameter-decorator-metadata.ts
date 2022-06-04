import { RouteParamType } from "@enums/route-param-type.enum";

export interface ParameterDecoratorMetadata {
    target: Object;
    type: RouteParamType;
    name: string | undefined;
    index: number;
    propertyKey: string | symbol;
}
