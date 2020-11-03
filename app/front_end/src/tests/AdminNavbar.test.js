import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container, Navbar } from "reactstrap";
import AdminNavbar from "../components/Navbars/AdminNavbar.jsx";

var response = {}

const mockStore = configureStore();
const initialState = {
  auth: { token: 'sadsdsd', isAuthenticated: true }
};

const store = mockStore(initialState);

test('Test Admin Navbar', () => {
    const wrapper = shallow(<AdminNavbar store={store} />).dive().dive()
    expect(wrapper.find(Navbar)).to.have.lengthOf(1);

});

