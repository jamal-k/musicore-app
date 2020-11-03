import React from 'react';
import { loginUserSuccess, logout } from '../actions/auth.js';
import { expect } from 'chai';

test('Test Login User Success', () => {
    const value = loginUserSuccess('token', 'token')
    expect(value.type).to.equal('LOGIN_USER_SUCCESS');
});

test('Test Logout', () => {
    const value = logout('token', 'token')
    expect(value.type).to.equal('LOGOUT');
});

