import {createMsg, ActionMap} from "../../index";

type Messages = {
    SignedIn: { firstname: string, lastname: string },
    Token: string,
    SignOut: undefined,
};

export const Msg    = createMsg<Messages>();
export type TypeMap = ActionMap<Messages>;
export type Actions = TypeMap[keyof TypeMap];
