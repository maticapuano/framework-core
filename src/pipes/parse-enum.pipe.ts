import { BadRequestException } from "@exceptions/http/bad-request.exception";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";
import { Injectable } from "decorators/injectable.decorator";

@Injectable()
export class ParseEnumPipe<T = any> implements PipeTransform<T> {
    public constructor(protected enumType: T) {
        if (!enumType) {
            throw new Error("Enum type must be provided");
        }
    }

    public transform(value: T): T {
        if (!this.isEnum(value)) {
            const enumValuesValid = Object.keys(this.enumType).map(
                key => this.enumType[key as keyof T],
            );
            const enumJoined = enumValuesValid.join(",");
            const messageError = `invalid value provided. Allowed values: ${enumJoined}`;

            throw new BadRequestException(messageError);
        }

        return value;
    }

    private isEnum(value: any): boolean {
        const keys = Object.keys(this.enumType);
        const values = keys.map(key => this.enumType[key as keyof T]);
        const isValid = values.includes(value);

        return isValid;
    }
}
