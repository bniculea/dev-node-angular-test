import { User } from './User';

export const LOGIN_USER = 'login-user';

export function loginUser(user: User){
    return {
        type: LOGIN_USER,
        loggedUser: user
    }
}