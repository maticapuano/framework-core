import { RouteParamType } from "@enums/route-param-type.enum";
import { createParamDecorator } from "@utils/create-param-decorator";

export const Query = createParamDecorator(RouteParamType.QUERY);
