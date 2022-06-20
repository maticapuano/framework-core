import { BadRequestException } from "@exceptions/http/bad-request.exception";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";
import { Injectable } from "../decorators/injectable.decorator";

@Injectable()
export class ParseDatePipe implements PipeTransform {
    public transform(value: string): Date {
        if (!this.isDate(value)) {
            throw new BadRequestException("Date must be in format YYYY-MM-DD");
        }

        const parsedValue = new Date(value);

        return parsedValue;
    }

    private isDate(value: any): boolean {
        const valueAllowed = ["number", "string"];
        const valueIsAllowed = valueAllowed.includes(typeof value);
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const isDate = regex.test(value);

        return valueIsAllowed && isDate;
    }
}
