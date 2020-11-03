import React from 'react';
import { render } from '@testing-library/react';
import Profile from '../views/Profile.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container } from "reactstrap";
import Header from "../components/Headers/Header.jsx";

var response = {}

const mockStore = configureStore();
const initialState = {
  auth: { token: 'sadsdsd', isAuthenticated: true }
};

const store = mockStore(initialState);

test('Test Container', () => {
    const mockSuccessResponse = response;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

    const wrapper = shallow(<Profile store={store} />).dive().dive()
    expect(wrapper.find(Container)).to.have.lengthOf(1);

});

test('Test Click', () => {
    window.alert = jest.fn();
    const wrapper = shallow(<Profile store={store} />).dive().dive()
    const button = wrapper.find('#saveButton');
    (button.find("#saveButton")).simulate('click');
    window.alert.mockClear();

});
