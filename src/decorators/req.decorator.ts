import { RouteParamType } from "@enums/route-param-type.enum";
import { createParamDecorator } from "@utils/create-param-decorator";

const requestParamFactory = createParamDecorator(RouteParamType.REQUEST);

export const Req = (): ParameterDecorator => requestParamFactory();
