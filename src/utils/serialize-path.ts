export function serializePath(path: string): string;
export function serializePath(path: string, withSeparator: boolean): string;
export function serializePath(path: string, withSeparator?: boolean): string {
    const pathArray = path.split("/").filter(Boolean);
    const pathSerialized = pathArray.join("/");
    const pathSerializedWithSlash = `/${pathSerialized}`;

    return withSeparator ? pathSerializedWithSlash : pathSerialized;
}
