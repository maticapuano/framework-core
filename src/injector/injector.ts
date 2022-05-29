import { Constructor } from "types/constructor.type";
import { InjectorError } from "./errors/injector-error";

export class Injector {
    private _container: Map<string, any>;
    private static _instance: Injector;

    private constructor() {
        this._container = new Map();
    }

    public static getInstance(): Injector {
        if (!this._instance) {
            this._instance = new Injector();
        }

        return this._instance;
    }

    public has(token: string): boolean;
    public has<T>(token: Constructor<T>): boolean;
    public has(token: string | Constructor<unknown>): boolean {
        const tokenString = typeof token === "string" ? token : token.name;

        return this._container.has(tokenString);
    }

    public reset(): void {
        this._container.clear();
    }

    public resolve<T>(token: Constructor<T>): T;
    public resolve<T>(token: string): T;
    public resolve<T>(token: string | Constructor<T>): T {
        const tokenString = typeof token === "string" ? token : token.name;

        if (token instanceof Function) {
            const dependencies: any[] = Reflect.getMetadata("design:paramtypes", token) || [];
            const instances = dependencies.map(dependency => this.resolve(dependency));

            const instance = new token(...instances);

            this._container.set(tokenString, instance);

            return instance;
        }

        const instance = this._container.get(tokenString);

        if (instance instanceof Function) {
            return this.resolve(instance);
        }

        return instance;
    }

    public register<T>(token: Constructor<T>, instance: T): void;
    public register<T>(token: string, instance: T): void;
    public register<T>(token: string | Constructor<T>, instance: T): void {
        const tokenString = typeof token === "string" ? token : token.name;

        if (token instanceof Function) {
            const dependencies = Reflect.getMetadata("design:paramtypes", token) || [];

            const instances = dependencies.map((dependency: any) => this.resolve(dependency));

            this._container.set(tokenString, new token(...instances));

            return;
        }

        if (typeof token === "string") {
            this._container.set(tokenString, instance);

            return;
        }

        throw new InjectorError("Injector: Sorry, but you can register only string or class");
    }
}
