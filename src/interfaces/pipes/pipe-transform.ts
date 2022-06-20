import { PipeArgumentMetadata } from "./pipe-argument-metadata";

export interface PipeTransform<T = any, R = T> {
    transform(value: T, argument: PipeArgumentMetadata): R;
}
