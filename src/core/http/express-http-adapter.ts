import { RequestMethod } from "@enums/request-method.enum";
import { CorsOptions } from "@interfaces/external/cors-options.interface";
import { MiddlewareFactory } from "@interfaces/http/http-server.interface";
import express, { Request, RequestHandler, Response } from "express";
import { AbstractHttpAdapter } from "./abstract-http-adapter";
import http from "http";
import cors from "cors";
import { RouterMethodFactory } from "@utils/router-method-factory";
import { ServeStaticOptions } from "@interfaces/http/serve-static-options.interface";
import { NotFoundException } from "@exceptions/http/not-found.exception";
import { AbstractHttpException } from "@exceptions/http/abstract-http.exception";
import { InternalServerErrorException } from "@exceptions/http/internal-server-error.exception";
import { BadRequestException } from "@exceptions/http/bad-request.exception";
import { HttpStatus } from "@enums/http-status.enum";
import { Logger } from "@services/logger/logger";

export class ExpressHttpAdapter extends AbstractHttpAdapter<any, Request, Response> {
    private routerMethodFactory: RouterMethodFactory;
    private logger: Logger;

    public constructor() {
        super(express());

        this.routerMethodFactory = new RouterMethodFactory();
        this.logger = new Logger(ExpressHttpAdapter.name);
    }

    public initHttpServer(): void {
        this.httpServer = http.createServer(this.getInstance());
    }

    public close(): void {
        if (!this.httpServer) {
            throw new Error("Http server is not initialized, please call initHttpServer() first");
        }

        new Promise(resolve => resolve(this.httpServer.close()));
    }

    public enabledCors(options: CorsOptions): void {
        this.use(cors(options));
    }

    public createMiddlewareFactory(method: RequestMethod): MiddlewareFactory {
        const factory = this.routerMethodFactory.create(this.instance, method);

        return factory.bind(this.instance);
    }

    public setParserMiddleware(): void {
        const parsers: Record<string, RequestHandler> = {
            json: express.json(),
            urlencoded: express.urlencoded({ extended: true }),
        };

        Object.keys(parsers).forEach(key => this.use(parsers[key]));
    }

    public setErrorHandler(): void {
        const handler = (err: any, req: Request, res: Response, _next: any): Response => {
            if (err instanceof AbstractHttpException) {
                return res.status(err.getStatusCode()).json(err.getResponse());
            }

            this.logger.error(err);

            const internal = new InternalServerErrorException("Internal server error");

            return res.status(internal.getStatusCode()).json(internal.getResponse());
        };

        this.use(this.handleJsonSyntax());
        this.use(handler);
    }

    public setNotFoundHandler(): void {
        this.all("*", () => {
            throw new NotFoundException("Resource not found");
        });
    }

    private handleJsonSyntax() {
        return (err: Error, _req: Request, _res: Response, next: Function): void => {
            if (err instanceof SyntaxError && "body" in err) {
                throw new BadRequestException("Payload invalid");
            }

            next(err);
        };
    }

    public getLocal(key: string): any;
    public getLocal<T>(key: string): T;
    public getLocal<T>(key: string, defaultValue: T): T;
    public getLocal(key: any, defaultValue?: any): any {
        return this.instance.locals[key] || defaultValue;
    }

    public setLocal(key: string, value: any): this {
        this.instance.locals[key] = value;

        return this;
    }

    public useStaticAssets(path: string, options: ServeStaticOptions): void {
        options.prefix
            ? this.instance.use(options.prefix, express.static(path, options))
            : this.instance.use(express.static(path, options));
    }

    public status(response: any, status: HttpStatus): this {
        return response.status(status);
    }

    public setHeader(response: any, name: string, value: string): this {
        return response.set(name, value);
    }
}
