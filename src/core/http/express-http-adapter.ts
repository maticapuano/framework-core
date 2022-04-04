import { RequestMethod } from "@enums/request-method.enum";
import { CorsOptions } from "@interfaces/external/cors-options.interface";
import { MiddlewareFactory } from "@interfaces/http/http-server.interface";
import express, { Request, RequestHandler, Response } from "express";
import { AbstractHttpAdapter } from "./abstract-http-adapter";
import http from "http";
import cors from "cors";
import { RouterMethodFactory } from "@utils/router-method-factory";

export class ExpressHttpAdapter extends AbstractHttpAdapter<any, Request, Response> {
    private routerMethodFactory: RouterMethodFactory;

    public constructor() {
        super(express());

        this.routerMethodFactory = new RouterMethodFactory();
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
        const factory = this.routerMethodFactory.create(this, method);

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
        throw new Error("Method not implemented.");
    }

    public setNotFoundHandler(): void {
        throw new Error("Method not implemented.");
    }
}
