import { User} from './User';
import {AppState} from './AppState';
import {LOGIN_USER} from './actions';

const initialState: AppState = {
    loggedUser: {
        username: "bogdam",
        password: "admin"
    }
}

function updateLoggedUser(state, action): AppState {
    debugger;
    return Object.assign({}, state, {
        loggedUser: action.loggedUser
    });
}

export function reducer(state = initialState, action) {
    switch(action.type){
        case LOGIN_USER:
            return updateLoggedUser(state, action);
        default:
            return state;
    }
}