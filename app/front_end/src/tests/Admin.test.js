import React from 'react';
import { render } from '@testing-library/react';
import Admin from '../layouts/Admin.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container } from "reactstrap";
import Header from "../components/Headers/Header.jsx";

test('Test Admin Layout', () => {
    const location = { pathname: '/dashboard/' };
    const wrapper = shallow(<Admin location={ location } />)
    expect(wrapper.find(".main-content")).to.have.lengthOf(1);

});

