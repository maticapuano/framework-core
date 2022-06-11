import { RouteParamType } from "@enums/route-param-type.enum";
import { createParamDecorator } from "@utils/create-param-decorator";

const remoteAddressFactory = createParamDecorator(RouteParamType.REMOTE_IP);

export const Ip = (): ParameterDecorator => remoteAddressFactory();
