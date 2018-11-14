import {ActionHandler, msgCreator} from "../../";

const messages = {
    SignedIn: (firstname: string, lastname: string) => ({firstname, lastname}),
    Token: (token: string) => token,
    SignOut: () => undefined,
};

const Msg = msgCreator(messages);

type Handler = ActionHandler<typeof messages>

export {Msg, Handler}
