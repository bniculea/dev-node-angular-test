import { User } from './User';

export const LOGIN_USER = 'login';
export const LOGOUT_USER= 'logout';

export function loginUser(user: User){
    return {
        type: LOGIN_USER,
        loggedUser: user
    }
}

export function logoutCurrentUser(){
    return {
        type:LOGIN_USER
    }
}