import { HttpStatus } from "@enums/http-status.enum";
import { AbstractHttpException, HttpExceptionRequest } from "./abstract-http.exception";

export class ForbiddenException extends AbstractHttpException {
    public constructor(content: HttpExceptionRequest) {
        super(content, HttpStatus.FORBIDDEN);
    }
}
