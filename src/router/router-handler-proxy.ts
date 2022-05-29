export class RouterHandlerProxyFactory {
    private statusCode = 200;
    private headers: Record<string, string> = {};

    public create(handler: Function) {
        return async (req: any, res: any, next: any): Promise<any> => {
            try {
                const result = await handler();

                if (result instanceof Promise) {
                    return result;
                }

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
}
