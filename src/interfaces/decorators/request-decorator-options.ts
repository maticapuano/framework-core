import { RequestMethod } from "@enums/request-method.enum";

export interface RequestDecoratorOptions {
    path?: string;
    method: RequestMethod;
}
