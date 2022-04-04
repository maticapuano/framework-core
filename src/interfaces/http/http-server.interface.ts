import { CorsOptions } from "@interfaces/external/cors-options.interface";
import { RequestMethod } from "enums/request-method.enum";

export type ErrorHandler<TRequest = any, TResponse = any> = (
    error: any,
    req: TRequest,
    res: TResponse,
    next?: Function,
) => any;

export type RequestHandler<TRequest = any, TResponse = any> = (
    req: TRequest,
    res: TResponse,
    next?: Function,
) => any;

export type MiddlewareFactory = (path: string, callback: Function) => any;

export interface HttpServer<TRequest = any, TResponse = any> {
    get(handler: RequestHandler<TRequest, TResponse>): any;
    get(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    get(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    post(handler: RequestHandler<TRequest, TResponse>): any;
    post(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    post(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    put(handler: RequestHandler<TRequest, TResponse>): any;
    put(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    put(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    patch(handler: RequestHandler<TRequest, TResponse>): any;
    patch(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    patch(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    delete(handler: RequestHandler<TRequest, TResponse>): any;
    delete(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    delete(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    head(handler: RequestHandler<TRequest, TResponse>): any;
    head(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    head(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    options(handler: RequestHandler<TRequest, TResponse>): any;
    options(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    options(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    all(handler: RequestHandler<TRequest, TResponse>): any;
    all(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    all(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    use(handler: RequestHandler<TRequest, TResponse> | ErrorHandler<TRequest, TResponse>): any;
    use(
        path: string,
        handler: RequestHandler<TRequest, TResponse> | ErrorHandler<TRequest, TResponse>,
    ): any;
    listen(port: number): void;
    listen(port: number, callback: () => void): void;
    listen(port: number | string): void;
    listen(port: number | string, callback: () => void): void;
    close(): void;
    initHttpServer(): void;
    setParserMiddleware(): void;
    enabledCors(options: CorsOptions): void;
    getInstance(): any;
    createMiddlewareFactory(method: RequestMethod): MiddlewareFactory;
    setErrorHandler(): void;
    setNotFoundHandler(): void;
}
