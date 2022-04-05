import { CorsOptions } from "@interfaces/external/cors-options.interface";
import { ServeStaticOptions } from "@interfaces/http/serve-static-options.interface";
import { ExpressHttpAdapter } from "./express-http-adapter";

export class HttpServerBuilder {
    private readonly _httpAdapter: ExpressHttpAdapter;

    public constructor() {
        this._httpAdapter = new ExpressHttpAdapter();
    }

    public setCors(options: CorsOptions): this {
        this._httpAdapter.enabledCors(options);

        return this;
    }

    public setStaticAssets(path: string, options: ServeStaticOptions): this {
        this._httpAdapter.useStaticAssets(path, options);

        return this;
    }

    public build(): ExpressHttpAdapter {
        this._httpAdapter.initHttpServer();
        this._httpAdapter.setParserMiddleware();
        this._httpAdapter.setNotFoundHandler();
        this._httpAdapter.setErrorHandler();

        return this._httpAdapter;
    }
}
