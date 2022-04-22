export const extendsArrayMetadata = <T extends Array<unknown>>(
    key: string,
    metadata: T,
    target: Function,
): void => {
    const previousMetadata = Reflect.getMetadata(key, target) || [];
    const newMetadata = [...previousMetadata, ...metadata];

    Reflect.defineMetadata(key, newMetadata, target);
};
