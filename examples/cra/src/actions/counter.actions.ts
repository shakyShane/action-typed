import msgCreator, {ActionHandler} from "action-typed";

const messages = {
    Increment: (num = 1) => num,
    Decrement: (num = 1) => num,
};

export const Msg = msgCreator(messages);

export type Handler = ActionHandler<typeof messages>;