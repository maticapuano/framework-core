import { sync } from "glob";

export const isString = (value: any): value is string => typeof value === "string";
export const isObject = (value: any): value is object =>
    typeof value === "object" && value !== null;
export const isArray = (value: any): value is Array<any> => Array.isArray(value);
export const castArray = <T = any>(value: any): Array<T> => (isArray(value) ? value : [value]);

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

export const getSourceFiles = (files: string | Array<string>): string[] => {
    const result: Set<string> = new Set<string>();
    const options = {
        cwd: process.cwd(),
        ignore: [
            "**/node_modules/**",
            "**/dist/**",
            "**/test/**",
            "**/__tests__/**",
            "**/__mocks__/**",
            "**/__test__/**",
        ],
    };
    const filesExpression = castArray<string>(files);

    filesExpression.forEach(file => {
        const matches = sync(file, options);

        matches.forEach(match => result.add(match));
    });

    return Array.from(result);
};
