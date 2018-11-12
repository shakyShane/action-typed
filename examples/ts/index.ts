import {Msg} from "./user.actions";
import {combineReducers, createStore} from "redux";
import {userReducer} from "./user.reducer";

const root = combineReducers({
    user: userReducer
});

const store = createStore(root);

store.dispatch(
    Msg("SignedIn", "shane", "osbourne")
);

store.dispatch(
    Msg("Token", "123456")
);

store.dispatch(
    Msg("SignOut")
);
