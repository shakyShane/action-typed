import React, { Component } from 'react';
import {connect, DispatchProp} from "react-redux";
import {Counter, Msg} from "./actions/counter.actions";
import {StoreState} from "./configureStore";
import {CounterState} from "./reducers/counter.reducer";

type AppProps = {
  // example of a bound msg
  counter: CounterState,
} & DispatchProp<any>

class App extends Component<AppProps> {
  render() {
    const {counter, dispatch} = this.props;

    return (
      <div className="App">
          {counter}
          <button onClick={() => dispatch(Msg(Counter.Increment, 1))}>Increment</button>
          <button onClick={() => dispatch(Msg(Counter.Increment, 1))}>Decrement by 20</button>
      </div>
    );
  }
}

export default connect(
    (x: StoreState) => ({ counter: x.counter }),
)(App);
