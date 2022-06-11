import { RouteParamType } from "@enums/route-param-type.enum";
import { createParamDecorator } from "@utils/create-param-decorator";

const nextParamFactory = createParamDecorator(RouteParamType.NEXT);

export const Next = (): ParameterDecorator => nextParamFactory();
