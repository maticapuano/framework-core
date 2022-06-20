import { BadRequestException } from "@exceptions/http/bad-request.exception";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";
import { isString } from "@utils/shared.util";
import { Injectable } from "decorators/injectable.decorator";

export interface ParseArrayOptions {
    separator?: string;
}

@Injectable()
export class ParseArrayPipe implements PipeTransform {
    private arraySeparator = ",";
    private defaultMessageError = "The value must be an array";

    public constructor(private options?: ParseArrayOptions) {}

    public transform(data: any): any {
        if (!data) {
            throw new BadRequestException(this.defaultMessageError);
        }

        if (!Array.isArray(data)) {
            if (!isString(data)) {
                throw new BadRequestException(this.defaultMessageError);
            }

            try {
                const separator = this.options?.separator || this.arraySeparator;
                const dataToArray = data.trim().split(separator);

                data = dataToArray;
            } catch {
                throw new BadRequestException(this.defaultMessageError);
            }
        }

        return data;
    }
}
