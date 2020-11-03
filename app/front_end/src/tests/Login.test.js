
import React from 'react';
import { render } from '@testing-library/react';
import Login from '../views/Login.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container, Card } from "reactstrap";
import Header from "../components/Headers/Header.jsx";
import fetchMock from 'fetch-mock'
import { createMemoryHistory } from 'history'


test('Test Card', () => {
    const mockStore = configureStore();
    const initialState = {
      auth: { token: 'sadsdsd', isAuthenticated: false }
    };
  
    const store = mockStore(initialState);

    const wrapper = shallow(<Login store={store} />).dive().dive()
    expect(wrapper.find(Card)).to.have.lengthOf(1);

});

test('Test Click', () => {
    const mockStore = configureStore();
    const initialState = {
      auth: { token: 'sadsdsd', isAuthenticated: false }
    };
  
    const store = mockStore(initialState);
    fetchMock.post('api/token/auth', {login: true})
    const history = createMemoryHistory('/dashboard')
    const wrapper = shallow(<Login store={store} history={history} />).dive().dive()
    const button = wrapper.find('#signin');
    (button.find("#signin")).simulate('click');

});
