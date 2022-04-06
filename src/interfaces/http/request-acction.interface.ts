export interface RequestActionInterface {
    request: any;
    response: any;
    next?: () => void;
}
