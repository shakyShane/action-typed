type LocalReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type EventTypeMap<T extends { [key: string]: {} }> =
    {
        [K in keyof T]: {
        type: K;
        payload: LocalReturnType<T[K]>
    }
    };

export type ActionHandler<T extends { [key: string]: {} }> =
    EventTypeMap<T>[keyof EventTypeMap<T>]

export function msgCreator<Obj extends { [key: string]: (...args: any[]) => any }>(input: Obj) {
    return function Msg<Kind extends string>(kind: Kind, ...args: Parameters<typeof input[Kind]>) {
        const output = input[kind].apply(null, args);
        if (output === undefined) {
            return {type: kind}
        }
        return {
            type: kind,
            payload: input[kind].apply(null, args)
        }
    }
}

export default msgCreator;
