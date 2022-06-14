export interface MiddlewareInterface {
    use(request: any, response: any, next: Function): any;
}
