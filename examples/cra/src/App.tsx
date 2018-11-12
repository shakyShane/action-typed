import React, { Component } from 'react';
import {connect} from "react-redux";
import {Msg} from "./actions/counter.actions";
import {StoreState} from "./configureStore";
import {CounterState} from "./reducers/counter.reducer";

type AppProps = {
  Msg: typeof Msg,
  counter: CounterState,
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
