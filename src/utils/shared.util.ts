import { sync } from "glob";
import { Constructor } from "types/constructor.type";

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

export const existMethodFromPrototype = <T = any>(
    name: string,
    prototype: Constructor<T>,
): boolean => {
    const prototypeMethods = Object.getOwnPropertyNames(prototype);
    const prototypeMethod = prototypeMethods.find(method => method === name);
    const isMethodExist = !!prototypeMethod;
    const isMethodFromPrototype = prototypeMethods.includes(name);

    return isMethodExist && isMethodFromPrototype;
};

export const isPlainObject = (fn: any): fn is object => {
    if (!isObject(fn)) {
        return false;
    }

    const proto = Object.getPrototypeOf(fn);

    if (!proto) {
        return true;
    }

    const constructor =
        Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;

    return (
        typeof constructor === "function" &&
        constructor instanceof constructor &&
        Function.prototype.toString.call(constructor) === Function.prototype.toString.call(Object)
    );
};
