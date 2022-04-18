export const isString = (value: any): value is string => typeof value === "string";
export const isObject = (value: any): value is object =>
    typeof value === "object" && value !== null;
export const isArray = (value: any): value is Array<any> => Array.isArray(value);

export const removeUndefined = <T = Object>(value: T | T[]): T[] => {
    const result: any[] = [];

    if (isArray(value)) {
        result.push(...value.filter(item => item !== undefined));
    }

    if (isObject(value) && !isArray(value)) {
        const filtered = Object.keys(value).reduce<Record<string, T>>((acc, key) => {
            if (value[key] !== undefined) {
                acc[key] = value[key];
            }

            return acc;
        }, {});

        result.push(filtered);
    }

    return result;
};
