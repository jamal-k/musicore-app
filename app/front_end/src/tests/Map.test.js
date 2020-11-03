
import React from 'react';
import { render } from '@testing-library/react';
import Map from '../components/Map.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container, Card, Col } from "reactstrap";
import Header from "../components/Headers/Header.jsx";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";

test('Test Map', () => {
    const mockStore = configureStore();
    const initialState = {
      auth: { token: 'sadsdsd', isAuthenticated: true }
    };
  
    const store = mockStore(initialState);

    const wrapper = shallow(<Map store={store} />)
    wrapper.instance().setState({loading: false})
    wrapper.setProps({events_loading: false})
    expect(wrapper.find('#mapwrapperid')).to.have.lengthOf(1);

});