import React from 'react';
import { checkAuth } from '../functions/auth.js';
import { expect } from 'chai';

const response = {token: 'fake_user_token', status: 200}


const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    token: "test"
  };
  global.localStorage = localStorageMock;

test('Test Auth is Authenticated', () => {
    const value = checkAuth({isAuthenticated: true}).catch (e => console.log(e));
});

test('Test Auth is not Authenticated', () => {
    const value = checkAuth({isAuthenticated: false}).catch (e => console.log);
});


