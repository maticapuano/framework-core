import { HttpStatus } from "@enums/http-status.enum";
import { isObject, isString, removeUndefined } from "@utils/shared.util";

export type HttpExceptionRequest =
    | string
    | {
          message: string;
          field?: string;
      };

export interface ErrorPayload {
    message: string;
    field?: string;
}

export interface HttpExceptionResponse {
    status: HttpStatus;
    errors: ErrorPayload[];
}

export abstract class AbstractHttpException extends Error {
    public constructor(private response: HttpExceptionRequest, private statusCode: HttpStatus) {
        super();

        this.initName();
        this.initMessage();
    }

    private initName(): void {
        this.name = this.constructor.name;
    }

    private initMessage(): void {
        if (isString(this.response)) {
            this.message = this.response;
        } else if (
            isObject(this.response) &&
            isString((this.response as Record<string, any>).message)
        ) {
            const name = this.constructor.name;
            const match = name.match(/[A-Z][a-z]+|[0-9]+/g);

            if (match) {
                this.message = match.join(" ");
            }
        }
    }

    public getStatusCode(): HttpStatus {
        return this.statusCode;
    }

    public getResponse(): HttpExceptionResponse {
        if (!isObject(this.response)) {
            return {
                status: this.statusCode,
                errors: [
                    {
                        message: this.message,
                    },
                ],
            };
        }

        const errorPayload = removeUndefined<ErrorPayload>(this.response);

        return {
            status: this.statusCode,
            errors: [errorPayload],
        };
    }
}
