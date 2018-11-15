import React, { Component } from 'react';
import {connect} from "react-redux";
import {AsFn, Msg, MsgBind} from "./actions/counter.actions";
import {StoreState} from "./configureStore";
import {CounterState} from "./reducers/counter.reducer";

type AppProps = {
  // regular msg creator
  Msg: typeof Msg,
  // example of a bound msg
  inc: AsFn["Increment"]
  counter: CounterState,
}

class App extends Component<AppProps> {
  render() {
    const {Msg, inc, counter} = this.props;

    return (
      <div className="App">
          {counter}
          <button onClick={() => inc()}>Increment</button>
          <button onClick={() => Msg("Decrement", 20)}>Decrement by 20</button>
      </div>
    );
  }
}

export default connect(
    (x: StoreState) => ({ counter: x.counter }),
    {Msg, inc: MsgBind("Increment")}
)(App);
