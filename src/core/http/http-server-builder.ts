import { CorsOptions } from "@interfaces/external/cors-options.interface";
import { ServeStaticOptions } from "@interfaces/http/serve-static-options.interface";
import { ControllerMetadata, MetadataResolver } from "@utils/metadata-resolver";
import { serializePath } from "@utils/serialize-path";
import { RouterHandlerProxyFactory } from "router/router-handler-proxy";
import { Constructor } from "types/constructor.type";
import { ExpressHttpAdapter } from "./express-http-adapter";

export class HttpServerBuilder {
    private readonly _httpAdapter: ExpressHttpAdapter;
    private _metadataResolver: ControllerMetadata[] = [];
    private _prefix = "/";

    public constructor() {
        this._httpAdapter = new ExpressHttpAdapter();
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

            const handler = routerProxy.setStatusCode(statusCode).create(rest.handler);
            const route = serializePath(`/${this._prefix}/${rest.route}`, true);

            this._httpAdapter[method](route, handler);
        });
    }

    public build(): ExpressHttpAdapter {
        this._httpAdapter.initHttpServer();
        this._httpAdapter.setParserMiddleware();

        this.setRoutesFromMetadata(this._metadataResolver);

        this._httpAdapter.setNotFoundHandler();
        this._httpAdapter.setErrorHandler();

        return this._httpAdapter;
    }
}
