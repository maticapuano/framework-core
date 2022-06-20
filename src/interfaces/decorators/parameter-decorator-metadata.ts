import { RouteParamType } from "@enums/route-param-type.enum";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";

export interface ParameterDecoratorMetadata {
    target: Object;
    type: RouteParamType;
    name: string | undefined;
    index: number;
    propertyKey: string | symbol;
    pipes: PipeTransform[] | Function[];
    paramType: any;
}
