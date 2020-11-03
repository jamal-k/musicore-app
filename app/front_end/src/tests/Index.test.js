import React from 'react';
import { render } from '@testing-library/react';
import Index from '../views/Index.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container } from "reactstrap";
import Header from "../components/Headers/Header.jsx";

var response = [
    {
      "month_added": 4,
      "details": {
      "category": "concerts",
      "country": "CA",
      "description": "",
      "duration": 0,
      "end": "2020-02-07T00:30:00Z",
      "entities": [
        {
          "entity_id": "RAZ92wpVvf8vc68VSyXzZk",
          "formatted_address": "10268 Yonge Street\nRichmond Hill, ON L4C 3B7\nCanada",
          "name": "Richmond Hill Centre for the Performing Arts",
          "type": "venue"
        }
      ],
      "first_seen": "2019-06-13T23:16:35Z",
      "id": "nCcrk867VFGbxcbYCx",
      "labels": [
        "concert",
        "music"
      ],
      "local_rank": 28,
      "location": [
        -79.438927,
        43.877386
      ],
      "place_hierarchies": [
        [
          "6295630",
          "6255149",
          "6251999",
          "6093943",
          "6185560",
          "6122091"
        ],
        [
          "6295630",
          "6255149",
          "6251999",
          "6093943",
          "6167865"
        ]
      ],
      "rank": 11,
      "relevance": null,
      "scope": "locality",
      "start": "2020-02-07T00:30:00Z",
      "state": "active",
      "timezone": "America/Toronto",
      "title": "Wendy Lands",
      "updated": "2020-01-31T00:45:48Z"
    }
  }
  
  ]


test('Test Container', () => {
    const mockSuccessResponse = response;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

    const mockStore = configureStore();
    const initialState = {
      auth: { token: 'sadsdsd', isAuthenticated: true }
    };
  
    const store = mockStore(initialState);

    const wrapper = shallow(<Index store={store} />).dive().dive()
    expect(wrapper.find(Container)).to.have.lengthOf(1);

});
