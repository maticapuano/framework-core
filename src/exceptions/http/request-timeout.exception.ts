import { HttpStatus } from "@enums/http-status.enum";
import { AbstractHttpException, HttpExceptionRequest } from "./abstract-http.exception";

export class RequestTimeoutException extends AbstractHttpException {
    public constructor(content: HttpExceptionRequest) {
        super(content, HttpStatus.REQUEST_TIMEOUT);
    }
}
