export function serializePath(path: string): string;
export function serializePath(path: string, withSeparator: boolean): string;
export function serializePath(path: string, withSeparator?: boolean): string {
    const pathLower = path.toLowerCase();
    const pathArray = pathLower.split("/").filter(Boolean);
    const pathSerialized = pathArray.join("/");
    const pathSerializedWithSlash = `/${pathSerialized}`;

    return withSeparator ? pathSerializedWithSlash : pathSerialized;
}
