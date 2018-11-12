## Action-typed

> Better type-safety, with less actual *typing* for Redux actions

## Video walkthrough

https://www.youtube.com/watch?v=v263zMyVv6k

## Install

```bash
npm i action-typed
# or
yarn add action-typed
```

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
import {ActionHandler, msgCreator} from "action-typed";

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