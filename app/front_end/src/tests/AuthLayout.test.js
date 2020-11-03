import React from 'react';
import { render } from '@testing-library/react';
import Auth from '../layouts/Auth.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container } from "reactstrap";
import Header from "../components/Headers/Header.jsx";

test('Test Auth Layout', () => {
    const location = { pathname: '/dashboard/' };
    const wrapper = shallow(<Auth location={ location } />)
    expect(wrapper.find(".main-content")).to.have.lengthOf(1);

});

