import { BadRequestException } from "@exceptions/http/bad-request.exception";
import { PipeTransform } from "@interfaces/pipes/pipe-transform";
import { isUuid, UuidVersion } from "@utils/is-uuid";
import { Injectable } from "decorators/injectable.decorator";

@Injectable()
export class ParseUUIDPipe implements PipeTransform<string> {
    public constructor(private version?: UuidVersion) {
        if (!this.version) {
            this.version = "all";
        }
    }

    public transform(uuid: string): string {
        if (!isUuid(uuid, this.version)) {
            const message = `Sorry, but ${uuid} is not a valid UUID (version ${this.version}).`;

            throw new BadRequestException(message);
        }

        return uuid;
    }
}
