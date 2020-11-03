import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';


test('Test Sidebar', () => {
    const wrapper = shallow(<Sidebar />)
    expect(wrapper.find(".navbar-collapse-header")).to.have.lengthOf(1);

});

