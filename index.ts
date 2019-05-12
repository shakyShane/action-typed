/**
 *
 * First, define your app's messages in an Object Literal 'type'
 *
 * type Messages = {
 *     SignedIn: { firstname: string, lastname: string },
 *     Token: string,
 *     SignOut: undefined,
 * };
 *
 * // Now, create an 'action creator'
 * export const Msg    = createMsg<Messages>();
 *
 * // You can also extract a 'TypeMap' so that you can index into your actions
 * export type TypeMap = ActionMap<Messages>;
 *
 * // And once you have the TypeMap, you can use it's own keys to index it (for use as a type-guard)
 * export type Actions = TypeMap[keyof TypeMap];
 *
 *
 * // ------------------------------------------------------------------------------------------------------------------------
 *
 * You can also use an enum to reduce the need for plain strings
 *
 * enum User {
 *     SignIn = 'User/SignIn'
 * }
 *
 * type Messages = {
 *     [User.SignedIn]: { firstname: string, lastname: string },
 *     [User.Token]: string,
 *     [User.SignOut]: undefined,
 * };
 *
 */
export function createMsg<Obj extends { [index: string]: any }>() {
    return function<Key extends keyof Obj>(name: Key, ...args: Obj[Key] extends undefined ? [] : [Obj[Key]]) {
        if (args.length > 0) {
            return { type: name, payload: args[0] };
        }
        return { type: name };
    };
}

/**
 *
 * Use this to create a index of all your object shapes
 *
 * // You can also extract a 'TypeMap' so that you can index into your actions
 * export type TypeMap = ActionMap<Messages>;
 *
 * // And once you have the TypeMap, you can use it's own keys to index it (for use as a type-guard)
 * export type Actions = TypeMap[keyof TypeMap];
 *
 */
export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
            type: Key;
        }
        : {
            type: Key;
            payload: M[Key];
        }
};
