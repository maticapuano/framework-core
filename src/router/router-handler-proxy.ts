import { RouteParamType } from "@enums/route-param-type.enum";
import { container } from "@injector/container";
import { ParameterDecoratorMetadata } from "@interfaces/decorators/parameter-decorator-metadata";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";
import { existMethodFromPrototype } from "@utils/shared.util";
import { RouteParamFactory } from "./route-param-factory";

export class RouterHandlerProxyFactory {
    private statusCode = 200;
    private headers: Record<string, string> = {};
    private parameters: ParameterDecoratorMetadata[] = [];
    private globalPipes: any = [];

    public create(handler: Function) {
        return async (req: any, res: any, next: any): Promise<any> => {
            try {
                const parameters = this.getParametersFromRequest(req, res, next);
                const result = await handler(...parameters);

                const headersKeys = Object.keys(this.headers);
                headersKeys.forEach(key => res.setHeader(key, this.headers[key]));

                const hasCustomResponse = this.parameters.some(
                    ({ type }) => type === RouteParamType.RESPONSE,
                );

                if (hasCustomResponse) {
                    return result;
                }

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

    public addGlobalPipes(pipes: any[]): this {
        this.globalPipes.push(...pipes);

        return this;
    }

    public getParametersFromRequest(req: any, res: any, next: any): any[] {
        const args: any[] = [];

        this.parameters.forEach(({ type, name, index, pipes }) => {
            const request = { req, res, next };
            const paramFactory = new RouteParamFactory();
            const result = paramFactory.create(type, name, request);

            pipes.push(...this.globalPipes);

            args[index] = result;

            for (const pipe of pipes) {
                args[index] = this.applyPipe(pipe, args[index]);
            }
        });

        return args;
    }

    private applyPipe(pipe: PipeTransform | Function, value: any): any {
        if (pipe instanceof Function) {
            const existTransform = existMethodFromPrototype("transform", pipe.prototype);

            if (!existTransform) {
                throw new Error("Pipe must have 'transform' method");
            }

            const pipeInstance = container.resolve<PipeTransform>(pipe as any);

            return pipeInstance.transform(value);
        }

        return pipe.transform(value);
    }
}
