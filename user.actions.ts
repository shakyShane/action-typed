import {ActionHandler, createMsg} from "./types";

const messages = {
    SignedIn: (firstname: string, lastname: string) => ({firstname, lastname}),
    Token: (token: string) => token,
    SignOut: () => undefined,
};

const Msg = createMsg(messages);

export {
    Msg,
}

export type Handler = ActionHandler<typeof messages>
