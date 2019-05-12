import { combineReducers, createStore } from "redux";
import { userReducer } from "./user.reducer";
import { Msg, TypeMap } from "./user.actions";

const root = combineReducers({
    user: userReducer
});

const store = createStore(root);

store.dispatch(
    Msg("SignedIn", { firstname: "shane", lastname: "osbourne" })
);

store.dispatch(
    Msg("Token", "123456")
);

store.dispatch(
    Msg("SignOut")
);

// You can also use string to access types of individual actions
type ac1 = TypeMap["SignOut"];
type ac2 = TypeMap["Token"];
type ac3 = TypeMap["SignedIn"];
