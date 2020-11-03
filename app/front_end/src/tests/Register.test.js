
import React from 'react';
import { render } from '@testing-library/react';
import Register from '../views/Register.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container, Card, Col } from "reactstrap";
import Header from "../components/Headers/Header.jsx";


test('Test Register', () => {
    const mockStore = configureStore();
    const initialState = {
      auth: { token: 'sadsdsd', isAuthenticated: false }
    };
  
    const store = mockStore(initialState);

    const wrapper = shallow(<Register store={store} />)
    expect(wrapper.find(Col)).to.have.lengthOf(1);

});