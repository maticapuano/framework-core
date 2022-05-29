import { Constants } from "@enums/constants.enum";

export const Header = (key: string, value: string): Function => {
    if (!key || !value) {
        throw new Error("Header decorator requires a key and a value");
    }

    return (target: Object, propertyKey: string): void => {
        const metadata = Reflect.getMetadata(Constants.Header, target, propertyKey) || [];

        metadata.push({
            key,
            value,
            propertyKey,
        });

        Reflect.defineMetadata(Constants.Header, metadata, target, propertyKey);
    };
};
