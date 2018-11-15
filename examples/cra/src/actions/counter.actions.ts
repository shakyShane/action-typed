import msgCreator, {ActionHandler, bindCreator, AsVoidReturn} from "../../../../";

export const messages = {
    Increment: (num = 1) => num,
    Decrement: (num = 1) => num,
};

export const Msg = msgCreator(messages);
export const MsgBind = bindCreator(messages);

export type AsFn = AsVoidReturn<typeof messages>;
export type Handler = ActionHandler<typeof messages>;