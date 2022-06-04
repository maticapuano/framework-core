export const Inject = <T = any>(token: T): Function => {
    return (target: object, key: string | symbol) => {
        const tokenType = token || Reflect.getMetadata("design:type", target, key);

        const properties =
            Reflect.getMetadata("self:properties_metadata", target.constructor) || [];

        properties.push({
            propertyKey: key,
            token: tokenType,
        });

        Reflect.defineMetadata("self:properties_metadata", properties, target.constructor);
    };
};
