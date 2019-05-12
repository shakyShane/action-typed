## Action-typed

> Better type-sa<fety, with less actual *typing* for Redux a>ctions

## Install

```bash
npm i action-typed
# or
yarn add action-typed
```

# V2 (for version 1.x, see below)

Define your event types

```ts
import { ActionMap, createMsg } from 'action-typed';

export enum Storage {
    Set = 'Storage/Set',
    Delete = 'Storage/Delete',
}

export type Messages = {
    [Storage.Set]: { key: string; value: any; };
    [Storage.Delete]: string;
};

export const Msg = createMsg<Messages>();
export type TypeMap = ActionMap<Messages>;
export type Actions = TypeMap[keyof TypeMap];

```

Now use `Msg` to create type-safe events:

```ts
Msg(Storage.Set, {key: 'user', value: {name: "shane"}})
```

---

# V1

****NOTE**** the following applies to V1 - we recommend switching to V2 above.

## Why

Video walkthrough if you prefer: https://www.youtube.com/watch?v=v263zMyVv6k

- [x] Maximum type safety from minimal code 👀
- [x] No need to preload redux with all possible types or use an augmented store from another library - soundness is checked at the point of interaction.
- [x] All types are derived from the implementation 🧙‍♀️
- [x] No 'boilerplate', just write a simple JavaScript object and provide provide types for your expected arguments
- [x] 100% interop with existing Redux middlewares (eg connected routers)
- [x] Exposes a helper type to convert your raw JavaScript object into a tagged union (discriminated union/algebraic data type)
- [x] Accurate type narrowing and safety when needed (eg: in reducers)
- [x] No need to dream up names for action creators, instead just use the type itself to distinguish between actions
- [x] No need to wrap payloads in `{type, payload}`s, it feels more like working with type constructors
- [x] Result/return types of all action creators is inferred from the implementation
- [x] No need to write separate types - they are all generated at run time and are 100% safe
- [x] Zero-cost library, adds nothing to your bundle size
- [x] Action names can be strings/enums/consts
- [x] Namespace your actions however you like (anything that's a valid object key)
- [x] Get type safety in action creators, components, reducers, thunks, epics or anywhere else - all derived from the same JS object


## Example

**user.actions.ts**

```ts
import {ActionHandler, msgCreator} from "action-typed";

// this replaces any action-creators you may have 😍
const messages = {
    SignedIn: (firstname: string, lastname: string) => ({firstname, lastname}),
    Token: (token: string) => token,
    SignOut: () => undefined,
};

export const Msg = msgCreator(messages);
export type Handler = ActionHandler<typeof messages>
```

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
    // you can't make a mistake here - the string "SignedIn" is type-safe, and it
    // dictates what the remaining parameters should be 👌
    Msg("SignedIn", "shane", "osbourne")
);
```

**user.reducer.ts**

```ts
import {Handler} from "./user.actions";

type State = {
    token: string
};

const initialState: State = { token: "" };

//
// this uses the helper union type that's inferred from the JS object
//                                                           ↓
export function userReducer(state = initialState, action: Handler): State { 
    switch (action.type) {
        // matching "Token" here narrows the type of `action`
        // that means you get full type-safety on the value of 'payload' 👌
        case "Token": {
            return { ...state, token: action.payload }
        }
    }
    return state;
}
```

**component example `mapDispatchToProps`**
```ts
import React, { Component } from 'react';
import {connect} from "react-redux";
import {Msg} from "./actions/counter.actions";
import {StoreState} from "./configureStore";

type AppProps = {
  Msg: typeof Msg,
  counter: number,
}

class App extends Component<AppProps> {
  render() {
    const {Msg, counter} = this.props;
    return (
      <div className="App">
          {counter}
          <button onClick={() => Msg("Increment")}>Increment</button>
          <button onClick={() => Msg("Decrement", 20)}>Decrement by 20</button>
      </div>
    );
  }
}

export default connect(
    (x: StoreState) => ({ counter: x.counter }),
    // don't map all your separate action-creators here
    {Msg}
)(App);
```
