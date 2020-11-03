export function loginUserSuccess(token, userName) {
    localStorage.setItem('token', token);
    return {
        type: 'LOGIN_USER_SUCCESS',
        payload: {
            token,
            userName
        },
    };
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: 'LOGOUT',
    };
}