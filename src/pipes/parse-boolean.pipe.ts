import { BadRequestException } from "@exceptions/http/bad-request.exception";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";
import { Injectable } from "../decorators/injectable.decorator";

@Injectable()
export class ParseBooleanPipe implements PipeTransform {
    public transform(value: any): boolean {
        if (this.isTrusty(value)) {
            return true;
        }

        if (this.isNotTrusty(value)) {
            return false;
        }

        throw new BadRequestException("Boolean value is not valid");
    }

    private isTrusty(value: boolean | string): boolean {
        const trusty = ["true", "1"];
        const lower = value.toString().toLowerCase();
        const isTrusty = trusty.some(value => lower === value);

        return isTrusty;
    }

    private isNotTrusty(value: boolean | string): boolean {
        const notTrusty = ["false", "0"];
        const lower = value.toString().toLowerCase();
        const isNotTrusty = notTrusty.some(value => lower === value);

        return isNotTrusty;
    }
}
