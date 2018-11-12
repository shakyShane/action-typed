import {Handler} from "./user.actions";

type State = {
    firstname: string,
    lastname: string,
    token: string
};

const initialState: State = { token: "", firstname: "", lastname: "" };

export function userReducer(state: State = initialState, action: Handler): State {
    switch (action.type) {
        case "SignedIn": {
            return {
                ...state,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        }
        case "Token": {
            return { ...state, token: action.payload }
        }
        case "SignOut": {
            return { ...state, token: "", firstname: "", lastname: "" }
        }
    }
    return state;
}
