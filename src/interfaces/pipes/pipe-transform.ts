export interface PipeTransform<T = any, R = T> {
    transform(value: T): R;
}
