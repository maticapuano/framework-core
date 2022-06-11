import { ParameterDecoratorMetadata } from "@interfaces/decorators/parameter-decorator-metadata";
import { RouteParamFactory } from "./route-param-factory";

export class RouterHandlerProxyFactory {
    private statusCode = 200;
    private headers: Record<string, string> = {};
    private parameters: ParameterDecoratorMetadata[] = [];

    public create(handler: Function) {
        return async (req: any, res: any, next: any): Promise<any> => {
            try {
                const parameters = this.getParametersFromRequest(req, res, next);
                const result = await handler(...parameters);

                const headersKeys = Object.keys(this.headers);
                headersKeys.forEach(key => res.setHeader(key, this.headers[key]));

                return res.status(this.statusCode).send(result);
            } catch (err) {
                next(err);
            }
        };
    }

    public setStatusCode(statusCode: number): this {
        this.statusCode = statusCode;

        return this;
    }

    public setHeader(key: string, value: string): this {
        this.headers[key] = value;

        return this;
    }

    public addParameter(parameters: ParameterDecoratorMetadata[]): this {
        this.parameters.push(...parameters);

        return this;
    }

    public getParametersFromRequest(req: any, res: any, next: any): any[] {
        const args: any[] = [];

        this.parameters.forEach(({ type, name, index }) => {
            const request = { req, res, next };
            const paramFactory = new RouteParamFactory();
            const result = paramFactory.create(type, name, request);

            args[index] = result;
        });

        return args;
    }
}
