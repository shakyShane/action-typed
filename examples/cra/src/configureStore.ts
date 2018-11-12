import {combineReducers, createStore} from "redux";
import {counterReducer, CounterState} from "./reducers/counter.reducer";

export type StoreState = {
    counter: CounterState
}

export function configureStore() {
    const store = createStore(
        combineReducers({
            counter: counterReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}