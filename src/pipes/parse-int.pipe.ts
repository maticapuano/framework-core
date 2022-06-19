import { BadGatewayException } from "@exceptions/http/bad-gateway.exception";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";

export class ParseIntPipe implements PipeTransform {
    public transform(value: string): number {
        if (!this.isNumericValue(value)) {
            throw new BadGatewayException(`${value} is not a numeric value`);
        }

        const parsedValue = parseInt(value, 10);

        return parsedValue;
    }

    private isNumericValue(value: any): boolean {
        const valueAllowed = ["number", "string"];
        const valueIsAllowed = valueAllowed.includes(typeof value);
        const regex = /^-?\d+$/;
        const isNumeric = regex.test(value);

        return valueIsAllowed && isNumeric && isFinite(value);
    }
}
