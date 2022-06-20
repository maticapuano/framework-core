import { CorsOptions } from "@interfaces/external/cors-options.interface";
import { ServeStaticOptions } from "@interfaces/http/serve-static-options.interface";
import { ControllerMetadata, MetadataResolver } from "@utils/metadata-resolver";
import { serializePath } from "@utils/serialize-path";
import { container } from "@injector/container";
import { RouterHandlerProxyFactory } from "router/router-handler-proxy";
import { Constructor } from "../../types/constructor.type";
import { ExpressHttpAdapter } from "./express-http-adapter";
import { Logger } from "@services/logger/logger";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";

export class HttpServerBuilder {
    private readonly _httpAdapter: ExpressHttpAdapter;
    private _metadataResolver: ControllerMetadata[] = [];
    private _globalPipes: any[] = [];
    private _prefix = "/";
    private _logger: Logger;

    public constructor() {
        this._httpAdapter = new ExpressHttpAdapter();
        this._logger = new Logger(HttpServerBuilder.name);
    }

    public setCors(options: CorsOptions): this {
        this._httpAdapter.enabledCors(options);

        return this;
    }

    public setStaticAssets(path: string, options?: ServeStaticOptions): this {
        this._httpAdapter.useStaticAssets(path, options || {});

        return this;
    }

    public setPrefix(prefix: string): this {
        this._prefix = prefix;

        return this;
    }

    public setController<T = any>(controller: Constructor<T>): this {
        const resolver = MetadataResolver.getController(controller);

        this._metadataResolver.push(...resolver);

        return this;
    }

    private setRoutesFromMetadata(metadata: ControllerMetadata[]): void {
        metadata.forEach(({ method, statusCode, ...rest }) => {
            const routerProxy = new RouterHandlerProxyFactory();
            const controller = container.resolve(rest.originalTarget.name) as Constructor<any>;
            const handlerRouter = rest.handler.bind(controller);

            rest.headers.forEach(({ key, value }) => routerProxy.setHeader(key, value));

            routerProxy.setStatusCode(statusCode);
            routerProxy.addParameter(rest.parameters);
            routerProxy.addGlobalPipes(this._globalPipes);

            const handler = routerProxy.setStatusCode(statusCode).create(handlerRouter);
            const route = serializePath(`/${this._prefix}/${rest.route}`, true);
            const middlewares = rest.middlewares;

            this._httpAdapter[method](route, middlewares, handler);

            this._logger.log(`${method.toUpperCase()} ${rest.route}`);
        });
    }

    public setGlobalPipe(...pipe: PipeTransform[] | Function[]): this {
        this._globalPipes.push(...pipe);

        return this;
    }

    public build(): ExpressHttpAdapter {
        this._httpAdapter.initHttpServer();
        this._httpAdapter.setParserMiddleware();

        this._logger.log(`Prefix: ${this._prefix}`);
        this._logger.log("Discovering controllers...");

        this.setRoutesFromMetadata(this._metadataResolver);

        this._httpAdapter.setNotFoundHandler();
        this._httpAdapter.setErrorHandler();

        return this._httpAdapter;
    }
}
