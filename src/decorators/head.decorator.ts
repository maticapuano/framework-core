import { RequestMethod } from "@enums/request-method.enum";
import { createRequestDecorator } from "@utils/create-request-decorator";

export const Head = createRequestDecorator(RequestMethod.HEAD);
