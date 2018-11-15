## Action-typed

> Better type-safety, with less actual *typing* for Redux actions

## Install

```bash
npm i action-typed
# or
yarn add action-typed
```

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
- [x] Action names can be strings/Ennis/consts
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

export function userReducer(state = initialState, action: Handler): State { 
    switch (action.type) {
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
    {Msg}
)(App);
```