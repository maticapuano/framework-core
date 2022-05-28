import { Constants } from "@enums/constants.enum";
import { HttpStatus } from "@enums/http-status.enum";

export const HttpStatusCode = (code: HttpStatus) => {
    return (target: Object, propertyKey: string): void => {
        Reflect.defineMetadata(Constants.HttpStatusCode, code, target, propertyKey);
    };
};
