
import React from 'react';
import { render } from '@testing-library/react';
import Details from '../views/Details.jsx';
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

var response = {status: 200}


import fetchMock from 'fetch-mock'

test('Test Container', () => {
    fetchMock.get('api/leads/null', [{"confidence":"Medium","date_added":"Thu, 02 Apr 2020 15:24:32 GMT","details":{"category":"performing-arts","country":"CA","description":"","duration":0,"end":"2020-03-19T00:15:00Z","entities":[{"entity_id":"X2R6QgQm2Vm8WNbTLLWdYC","formatted_address":"350 King Street West\nToronto, ON M5V 3X5\nCanada","name":"TIFF Bell Lightbox","type":"venue"}],"first_seen":"2020-03-10T21:59:14Z","id":"JDQBXpwoqrJz8ddMpM","labels":["movie","performing-arts"],"local_rank":17,"location":[-79.390408,43.64653],"place_hierarchies":[["6295630","6255149","6251999","6093943","7870793"],["6295630","6255149","6251999","6093943","6167865"]],"rank":11,"relevance":null,"scope":"locality","start":"2020-03-19T00:15:00Z","state":"active","timezone":"America/Toronto","title":"First Cow","updated":"2020-03-11T07:30:54Z"},"id":"JDQBXpwoqrJz8ddMpM","month_added":"4","revenue":100,"status":"In Contact","year_added":"2020"}])
    fetchMock.get('api/leads/null/generationprocess', {'generation_process': '<ul><li>Event Category is in performing-arts</li><li>1 Relevant tweets found.</li></ul>'})
    fetchMock.get('api/leads/null/tweets', [])
    const location = { search: '/details?id=JDQBXpwoqrJz8ddMpM' };
    const wrapper = shallow(<Details store={store} location={location} />).dive().dive()
    wrapper.setState({ event: [{"confidence":"Medium","date_added":"Thu, 02 Apr 2020 15:24:32 GMT","details":{"category":"performing-arts","country":"CA","description":"","duration":0,"end":"2020-03-19T00:15:00Z","entities":[{"entity_id":"X2R6QgQm2Vm8WNbTLLWdYC","formatted_address":"350 King Street West\nToronto, ON M5V 3X5\nCanada","name":"TIFF Bell Lightbox","type":"venue"}],"first_seen":"2020-03-10T21:59:14Z","id":"JDQBXpwoqrJz8ddMpM","labels":["movie","performing-arts"],"local_rank":17,"location":[-79.390408,43.64653],"place_hierarchies":[["6295630","6255149","6251999","6093943","7870793"],["6295630","6255149","6251999","6093943","6167865"]],"rank":11,"relevance":null,"scope":"locality","start":"2020-03-19T00:15:00Z","state":"active","timezone":"America/Toronto","title":"First Cow","updated":"2020-03-11T07:30:54Z"},"id":"JDQBXpwoqrJz8ddMpM","month_added":"4","revenue":100,"status":"In Contact","year_added":"2020"}] });
    expect(wrapper.find(Container)).to.have.lengthOf(1);

});

test('Test Select', () => {
    const wrapper = shallow(<Details store={store} />).dive().dive()
    wrapper.setState({ event: [{"confidence":"Medium","date_added":"Thu, 02 Apr 2020 15:24:32 GMT","details":{"category":"performing-arts","country":"CA","description":"","duration":0,"end":"2020-03-19T00:15:00Z","entities":[{"entity_id":"X2R6QgQm2Vm8WNbTLLWdYC","formatted_address":"350 King Street West\nToronto, ON M5V 3X5\nCanada","name":"TIFF Bell Lightbox","type":"venue"}],"first_seen":"2020-03-10T21:59:14Z","id":"JDQBXpwoqrJz8ddMpM","labels":["movie","performing-arts"],"local_rank":17,"location":[-79.390408,43.64653],"place_hierarchies":[["6295630","6255149","6251999","6093943","7870793"],["6295630","6255149","6251999","6093943","6167865"]],"rank":11,"relevance":null,"scope":"locality","start":"2020-03-19T00:15:00Z","state":"active","timezone":"America/Toronto","title":"First Cow","updated":"2020-03-11T07:30:54Z"},"id":"JDQBXpwoqrJz8ddMpM","month_added":"4","revenue":100,"status":"In Contact","year_added":"2020"}] });
    const button = wrapper.find('#select-change');
    (button.find("#select-change")).simulate('change', { target: {value:'Successful'} });
});


test('Test Update Revenue', () => {
    const responseBody = {response: 'data from the server'};

    fetchMock.putOnce('*', {test: 'test'})

    const wrapper = shallow(<Details store={store} />).dive().dive()
    wrapper.setState({ event: [{"confidence":"Medium","date_added":"Thu, 02 Apr 2020 15:24:32 GMT","details":{"category":"performing-arts","country":"CA","description":"","duration":0,"end":"2020-03-19T00:15:00Z","entities":[{"entity_id":"X2R6QgQm2Vm8WNbTLLWdYC","formatted_address":"350 King Street West\nToronto, ON M5V 3X5\nCanada","name":"TIFF Bell Lightbox","type":"venue"}],"first_seen":"2020-03-10T21:59:14Z","id":"JDQBXpwoqrJz8ddMpM","labels":["movie","performing-arts"],"local_rank":17,"location":[-79.390408,43.64653],"place_hierarchies":[["6295630","6255149","6251999","6093943","7870793"],["6295630","6255149","6251999","6093943","6167865"]],"rank":11,"relevance":null,"scope":"locality","start":"2020-03-19T00:15:00Z","state":"active","timezone":"America/Toronto","title":"First Cow","updated":"2020-03-11T07:30:54Z"},"id":"JDQBXpwoqrJz8ddMpM","month_added":"4","revenue":100,"status":"In Contact","year_added":"2020"}] });
    wrapper.instance().updateRevenue()
});



