export const isString = (value: any): value is string => typeof value === "string";
export const isObject = (value: any): value is object =>
    typeof value === "object" && value !== null;

export const removeUndefined = <T = Object>(value: T): T => {
    if (!isObject(value)) {
        return value;
    }

    const result: any = {};

    for (const key in value) {
        if (value[key] !== undefined) {
            result[key] = value[key];
        }
    }

    return result;
};
