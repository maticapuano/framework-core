import { ParamType } from "../../types/param-type.type";
import { Constructor } from "../../types/constructor.type";

export interface PipeArgumentMetadata {
    type: ParamType;
    metadataType?: Constructor<unknown> | undefined;
    data: string | undefined;
}
