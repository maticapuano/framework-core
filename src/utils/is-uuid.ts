import { isString } from "./shared.util";

export type UuidVersion = "1" | "2" | "3" | "4" | "5" | "all";

const uuid: Record<UuidVersion, RegExp> = {
    "1": /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    "2": /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    "3": /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    "4": /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    "5": /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
};

export const isUuid = (value: string, version?: UuidVersion): boolean => {
    if (!isString(value)) {
        return false;
    }

    const uuidVersion = version || "all";
    const regex = uuid[uuidVersion];
    const isUuid = regex.test(value);

    return regex && isUuid;
};
