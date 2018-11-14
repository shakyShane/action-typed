import {Msg, Msgs} from "./user.actions";
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

// You can also use string to access types of individual actions
type ac1 = Msgs["SignOut"];
type ac2 = Msgs["Token"];
type ac3 = Msgs["SignedIn"];
