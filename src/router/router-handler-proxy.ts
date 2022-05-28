export class RouterHandlerProxyFactory {
    private statusCode = 200;

    public create(handler: Function) {
        return async (req: any, res: any, next: any): Promise<any> => {
            try {
                const result = await handler();

                if (result instanceof Promise) {
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
}
