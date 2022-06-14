import { Injectable } from "./injectable.decorator";

export const Middleware = (): Function => {
    return Injectable();
};
