import {createMsg, ActionMap} from "../../";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ofType} from "redux-observable";

enum User {
    SignIn = 'User/SignIn',
    SignOut = 'User/SignOut',
    Token = 'User/Token',
}

type Messages = {
    [User.SignIn]: {
        firstname: string,
        lastname: string
    },
    [User.Token]: string,
    [User.SignOut]: undefined,
};

export const Msg    = createMsg<Messages>();
export type TypeMap = ActionMap<Messages>;
export type Actions = TypeMap[keyof TypeMap];

function epic(action$: Observable<any>) {
    return action$.pipe(
        ofType<Actions, TypeMap[User.Token]>(User.Token)
        , tap(({payload}) => {

            console.log(payload);
        })
    )
}

function epic2(action$: Observable<any>) {
    return action$.pipe(
        ofType<Actions, TypeMap[User.SignIn]>(User.SignIn)
        , tap(({payload}) => {
            console.log(payload);
        })
    )
}

function epic3(action$: Observable<any>) {
    return action$.pipe(
        ofType<Actions, TypeMap[User.SignIn]>(User.SignIn)
        , tap(({payload}) => {
            console.log(payload);
        })
    )
}
