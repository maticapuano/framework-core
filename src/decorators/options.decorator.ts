import { RequestMethod } from "@enums/request-method.enum";
import { createRequestDecorator } from "@utils/create-request-decorator";

export const Options = createRequestDecorator(RequestMethod.OPTIONS);
