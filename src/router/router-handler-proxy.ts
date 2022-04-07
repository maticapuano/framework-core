export type RouterHandlerProxy = <TRequest, TResponse>(
    req?: TRequest,
    res?: TResponse,
    next?: () => void,
) => void;

export class RouterHandlerProxyFactory {
    public create(target: RouterHandlerProxy) {
        return async <TRequest, TResponse>(
            req: TRequest,
            res: TResponse,
            next: (...args: any[]) => void,
        ): Promise<void> => {
            try {
                await target(req, res, next);
            } catch (e) {
                next(e);
            }
        };
    }
}
