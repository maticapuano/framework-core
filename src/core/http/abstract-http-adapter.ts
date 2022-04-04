import { RequestMethod } from "@enums/request-method.enum";
import { CorsOptions } from "@interfaces/external/cors-options.interface";
import {
    ErrorHandler,
    HttpServer,
    MiddlewareFactory,
    RequestHandler,
} from "@interfaces/http/http-server.interface";

export abstract class AbstractHttpAdapter<TServer = any, TRequest = any, TResponse = any>
    implements HttpServer<TRequest, TResponse>
{
    protected httpServer: TServer | undefined;

    public constructor(protected instance: any) {}

    public get(handler: RequestHandler<TRequest, TResponse>): any;
    public get(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    public get(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    public get(path: any, handler?: any, ...rest: any[]): any {
        return this.instance.get(path, handler, ...rest);
    }

    public post(handler: RequestHandler<TRequest, TResponse>): any;
    public post(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    public post(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    public post(path: any, handler?: any, ...rest: any[]): any {
        return this.instance.post(path, handler, ...rest);
    }

    public put(handler: RequestHandler<TRequest, TResponse>): any;
    public put(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    public put(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    public put(path: any, handler?: any, ...rest: any[]): any {
        return this.instance.put(path, handler, ...rest);
    }

    public patch(handler: RequestHandler<TRequest, TResponse>): any;
    public patch(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    public patch(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    public patch(path: any, handler?: any, ...rest: any[]): any {
        return this.instance.patch(path, handler, ...rest);
    }

    public delete(handler: RequestHandler<TRequest, TResponse>): any;
    public delete(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    public delete(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    public delete(path: any, handler?: any, ...rest: any[]): any {
        return this.instance.delete(path, handler, ...rest);
    }

    public head(handler: RequestHandler<TRequest, TResponse>): any;
    public head(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    public head(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    public head(path: any, handler?: any, ...rest: any[]): any {
        return this.instance.head(path, handler, ...rest);
    }

    public options(handler: RequestHandler<TRequest, TResponse>): any;
    public options(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    public options(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    public options(path: any, handler?: any, ...rest: any[]): any {
        return this.instance.options(path, handler, ...rest);
    }

    public all(handler: RequestHandler<TRequest, TResponse>): any;
    public all(path: string, handler: RequestHandler<TRequest, TResponse>): any;
    public all(path: string, ...handlers: RequestHandler<TRequest, TResponse>[]): any;
    public all(path: any, handler?: any, ...rest: any[]): any {
        return this.instance.all(path, handler, ...rest);
    }

    public use(
        handler: RequestHandler<TRequest, TResponse> | ErrorHandler<TRequest, TResponse>,
    ): any;
    public use(
        path: string,
        handler: RequestHandler<TRequest, TResponse> | ErrorHandler<TRequest, TResponse>,
    ): any;
    public use(path: any, handler?: any): any {
        return this.instance.use(path, handler);
    }

    public listen(port: number): void;
    public listen(port: number, callback: () => void): void;
    public listen(port: string | number): void;
    public listen(port: string | number, callback: () => void): void;
    public listen(port: any, callback?: any): void {
        this.instance.listen(port, callback);
    }

    public getInstance<T = any>(): T {
        return this.instance as T;
    }

    abstract initHttpServer(): void;
    abstract setParserMiddleware(): void;
    abstract close(): void;
    abstract enabledCors(options: CorsOptions): void;
    abstract createMiddlewareFactory(method: RequestMethod): MiddlewareFactory;
    abstract setErrorHandler(): void;
    abstract setNotFoundHandler(): void;
}
