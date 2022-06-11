import { RouteParamType } from "@enums/route-param-type.enum";

type Request<TRequest, TResponse> = { req: TRequest; res: TResponse; next: Function };

export class RouteParamFactory {
    public create<TRequest extends Record<string, any> = any, TResponse = any, TResult = any>(
        type: RouteParamType,
        data: string | object | any,
        request: Request<TRequest, TResponse>,
    ): TResult | null {
        const { req, res, next } = request;

        switch (type) {
            case RouteParamType.NEXT:
                return next as any;
            case RouteParamType.REQUEST:
                return req as any;
            case RouteParamType.RESPONSE:
                return res as any;
            case RouteParamType.BODY:
                return data ? req.body[data] : req.body;
            case RouteParamType.PARAM:
                return data ? req.params[data] : req.params;
            case RouteParamType.QUERY:
                return data ? req.query[data] : req.query;
            case RouteParamType.HEADERS:
                return data ? req.headers[data.toLowerCase()] : req.headers;
            case RouteParamType.FILE:
                return req[data || "file"];
            case RouteParamType.FILES:
                return req.files;
            case RouteParamType.REMOTE_IP:
                return req.ip;
            default:
                return null;
        }
    }
}
