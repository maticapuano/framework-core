import { RouteParamType } from "@enums/route-param-type.enum";
import { createParamDecorator } from "@utils/create-param-decorator";

const responseParamFactory = createParamDecorator(RouteParamType.RESPONSE);

export const Res = (): ParameterDecorator => responseParamFactory();
