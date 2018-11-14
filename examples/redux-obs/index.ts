import {msgCreator, LocalReturnType, ActionTypeMap} from "../../";
import {tap, filter} from "rxjs/operators";
import {Observable} from "rxjs";
import {ofType} from "redux-observable";

const messages = {
    SignedIn: (firstname: string, lastname: string) => ({firstname, lastname}),
    Token: (token: string) => token,
    SignOut: () => undefined,
};

const Msg = msgCreator(messages);
type Msgs = ActionTypeMap<typeof messages>;

function epic(action$: Observable<any>) {
    return action$.pipe(
        customOfType(messages, "Token", "SignedIn")
        , tap(({payload}) => {
            console.log(payload);
        })
    )
}

const userOfType = ofTypeCreator(messages);

function epic2(action$: Observable<any>) {
    return action$.pipe(
        userOfType("SignedIn")
        , tap(({payload}) => {
            console.log(payload);
        })
    )
}

function epic3(action$: Observable<any>) {
    return action$.pipe(
        ofType<Msgs["SignedIn"]>("SignedIn")
        , tap(({payload}) => {
            console.log(payload);
        })
    )
}

function ofTypeCreator<Obj extends {[index: string]: any}>(obj: Obj) {
    return function ofType<Kind extends keyof Obj>(...keys: Kind[]) {
        return function(source: Observable<any>): Observable<{type: Kind, payload: LocalReturnType<Obj[Kind]>}> {
            return source.pipe(filter((x) => {
                if (x && x.type) {
                    return keys.indexOf(x.type) !== -1;    
                }
                return false;
            }))
        }
    }    
}

function customOfType<Obj extends {[index: string]: any}, Kind extends keyof Obj>(obj: Obj, ...keys: Kind[]) {
    return function(source: Observable<any>): Observable<{type: Kind, payload: LocalReturnType<Obj[Kind]>}> {
        return source.pipe(filter((x) => {
            if (x && x.type) {
                return keys.indexOf(x.type) !== -1;    
            }
            return false;
        }))
    }
}