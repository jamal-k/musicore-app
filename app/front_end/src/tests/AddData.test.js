
import React from 'react';
import { render } from '@testing-library/react';
import AddData from '../views/AddData.jsx';
import {renderLoadData} from '../views/AddData.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container, Card,  Form } from "reactstrap";
import Header from "../components/Headers/Header.jsx";
import SelectStatus from "../components/SelectStatus.jsx";
import FormGroupContainer from "../components/FormGroupContainer.jsx";

const mockStore = configureStore();
const initialState = {
  auth: { token: 'sadsdsd', isAuthenticated: true }
};

const store = mockStore(initialState);

test('Test Container', () => {

    const wrapper = shallow(<AddData store={store} />).dive().dive()
    expect(wrapper.find(Container)).to.have.lengthOf(1);

});

test('Test Form', () => {

    const wrapper = shallow(<AddData store={store} />).dive().dive()
    expect(wrapper.find(Form)).to.have.lengthOf(1);

});

test('Test loadDataContainer', () => {
    const wrapper = shallow(<AddData store={store} />).dive().dive()
    expect(wrapper.instance().renderLoadData()).to.be.a('object')

});

// test('Test FormKey', () => {

//     const wrapper = shallow(<AddData store={store} />).dive().dive()
//     const formkey = wrapper.find('input');
//     formkey.forEach((node) => {
//         (node.find('input')).simulate('keypress', {key: 'A'})
//       });

// });

test('Test Click', () => {

    const wrapper = shallow(<AddData store={store} />).dive().dive()
    const button = wrapper.find('#submitLead');
    (button.find("#submitLead")).simulate('click');

});

