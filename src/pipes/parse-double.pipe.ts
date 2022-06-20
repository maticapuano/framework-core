import { BadRequestException } from "@exceptions/http/bad-request.exception";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";
import { Injectable } from "../decorators/injectable.decorator";

@Injectable()
export class ParseDoublePipe implements PipeTransform {
    public transform(value: string): number {
        if (!this.isNumericValue(value)) {
            throw new BadRequestException(`${value} is not a numeric value`);
        }

        const parsedValue = parseFloat(value);

        return parsedValue;
    }

    private isNumericValue(value: any): boolean {
        const valueAllowed = ["number", "string"];
        const valueIsAllowed = valueAllowed.includes(typeof value);
        const regex = /^[0-9]*\.?[0-9]+$/;
        const isNumeric = regex.test(value);

        return valueIsAllowed && isNumeric && !isNaN(parseFloat(value)) && isFinite(value as any);
    }
}
