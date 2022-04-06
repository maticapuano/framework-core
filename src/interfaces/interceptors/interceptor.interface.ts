import { RequestActionInterface } from "@interfaces/http/request-acction.interface";

export interface InterceptorInterface<T = any> {
    intercept(request: RequestActionInterface, data: T): Promise<any> | any;
}
