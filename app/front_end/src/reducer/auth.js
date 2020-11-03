import { createReducer } from './function';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    isRegistering: false,
    isRegistered: false,
    registerStatusText: null,
};

export default createReducer(initialState, {
    ['LOGIN_USER_SUCCESS']: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: true,
            token: payload.token,
            userName: jwtDecode(payload.token).email,
        }),
      ['LOGOUT']: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null,
        }),
    });