## Action-typed

> Better type-safety, with less actual *typing* for Redux actions

## Video walkthrough

https://www.youtube.com/watch?v=v263zMyVv6k

## Example

**index.ts**

```ts
import {combineReducers, createStore} from "redux";
import {userReducer} from "./user.reducer";
import {Msg} from "./user.actions";

const root = combineReducers({
    user: userReducer
});

const store = createStore(root);

store.dispatch(
    Msg("SignedIn", "shane", "osbourne")
);
```

**user.actions.ts**

```ts
import {ActionHandler, msgCreator} from "../../";

const messages = {
    SignedIn: (firstname: string, lastname: string) => ({firstname, lastname}),
    Token: (token: string) => token,
    SignOut: () => undefined,
};

export const Msg = msgCreator(messages);
export type Handler = ActionHandler<typeof messages>
```

**user.reducer.ts**

```ts
import {Handler} from "./user.actions";

type State = {
    token: string
};

const initialState: State = { token: "" };

export function userReducer(state: State = initialState, action: Handler): State {
    switch (action.type) {
        case "Token": {
            return { ...state, token: action.payload }
        }
    }
    return state;
}
```
