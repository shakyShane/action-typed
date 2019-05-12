import {ActionMap, createMsg} from "../../../../index";

export enum Counter {
    Increment = 'Increment',
    Decrement = 'Decrement',
}

export type Messages = {
    [Counter.Increment]: number,
    [Counter.Decrement]: number,
};

export const Msg = createMsg<Messages>();
export type TypeMap = ActionMap<Messages>;
export type Handler = TypeMap[keyof TypeMap];
