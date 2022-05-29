import { container } from "injector/container";
import { Constructor } from "types/constructor.type";

export const Injectable = (): Function => {
    return <T>(target: Constructor<T>): void => {
        container.register(target.name, target);
    };
};
