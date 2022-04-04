import { RequestMethod } from "@enums/request-method.enum";
import { HttpServer } from "@interfaces/http/http-server.interface";

export class RouterMethodFactory {
    public create(target: HttpServer, method: RequestMethod): Function {
        const factory = target[method];

        return (factory && factory.bind(target)) ?? target.use;
    }
}
