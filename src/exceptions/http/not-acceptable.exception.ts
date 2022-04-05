import { HttpStatus } from "@enums/http-status.enum";
import { AbstractHttpException, HttpExceptionRequest } from "./abstract-http.exception";

export class NotAcceptableException extends AbstractHttpException {
    public constructor(content: HttpExceptionRequest) {
        super(content, HttpStatus.NOT_ACCEPTABLE);
    }
}
