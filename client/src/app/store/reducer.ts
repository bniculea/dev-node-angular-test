import { User} from './User';
import {AppState} from './AppState';
import {LOGIN_USER, LOGOUT_USER} from './actions';

const initialState: AppState = {
    loggedUser: {
        username: "bogdam",
        password: "admin"
    }
}

function updateLoggedUser(state, action): AppState {
    return Object.assign({}, state, {
        loggedUser: action.loggedUser
    });
}

function logoutUser(state){
    return Object.assign({}, state, {
        loggedUser: null
    });
}

export function reducer(state = initialState, action) {
    switch(action.type){
        case LOGIN_USER:
            return updateLoggedUser(state, action);
        case LOGOUT_USER:
            return logoutUser(state)
        default:
            return state;
    }
}