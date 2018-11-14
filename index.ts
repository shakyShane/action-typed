/**
 * Accept a plain object literal where the keys are stings (or enum members)
 * and produce a function that can be called with 100% typesafety.
 *
 * This is done by using Typescripts ability to infer the return types of functions
 * combined with the ability to create new types from existing ones (mapped types)
 *
 * eg:
 *
 * const messages = {
 *      SignedIn: (firstname: string, lastname: string) => ({firstname, lastname}),
 *      Token: (token: string) => token,
 *      SignOut: () => undefined,
 * };
 *
 * export const Msg = msgCreator(messages);
 *
 * Msg("Token", "12345") // OK
 * Msg("token", "12345") // error
 * Msg("Token", 12345)   // error
 *
 */
export function msgCreator<Obj extends DefaultMessageDefinition>(input: Obj) {
    return function Msg<Kind extends string>(kind: Kind, ...args: Parameters<typeof input[Kind]>)
        : { type: Kind, payload: LocalReturnType<typeof input[Kind]> }
    {
        const output = input[kind].apply(null, args);
        if (output === undefined) {
            return { type: kind, payload: undefined }
        }
        return {
            type: kind,
            payload: output,
        }
    }
}

export default msgCreator;

/**
 * Defines the structure of the Object literal
 * that's used to create all the inferred types.
 *
 * eg:
 *
 * const messages = {
 *   Increment: (num = 1) => num
 * }
 *
 */
type DefaultMessageDefinition = {
    [key: string]: (...args: any[]) => any
};

/**
 * Use this to create a union of all possible action
 * types in the form {type: string, payload: inferred}.
 *
 * You can then use this union type with something
 * like a switch statement to narrow the type-checking
 *
 * Eg:
 *
 *   type AllActions = ActionHandler<typeof messages>
 */
export type ActionHandler<T extends { [key: string]: {} }> = ActionTypeMap<T>[keyof ActionTypeMap<T>]

/**
 * Converts the `messages` structure to type + payload, where type
 * is the original Object key, and 'payload' is the inferred return type
 */
export type ActionTypeMap<T extends { [key: string]: {} }> = {
    [K in keyof T]: {
        type: K;
        payload: LocalReturnType<T[K]>
    }
};

/**
 * This type will extract the inferred return type of a
 * given function (T)
 */
export type LocalReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
