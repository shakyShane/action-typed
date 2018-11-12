import {Handler} from "../actions/counter.actions";

export type CounterState = number;
const initial: CounterState = 0;

export function counterReducer(state = initial, action: Handler): CounterState {
    switch (action.type) {
        case "Increment": {
            return state + action.payload
        }
        case "Decrement": {
            return state - action.payload
        }
        default: return state;
    }
}