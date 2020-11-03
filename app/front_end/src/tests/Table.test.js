
import React from 'react';
import Table from '../components/Table.jsx';
import { DefaultColumnFilter } from '../components/Table.jsx';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Container, Card, Col } from "reactstrap";


const data = [
    {
      id: 'sasd',
      title: 'Wendy Lands',
      location: '10268 Yonge Street\nRichmond Hill, ON L4C 3B7\nCanada',
      confidence: 'High',
      status: 'None'
    }
  ]

test('Test Map', () => {
    const columns = [
        { Header: 'Id', accessor: 'id'
        },
        { Header: 'Title', accessor: 'title', Cell: row => <div style={{ fontWeight: "bold" }}>{row.value}</div>,
        }, 
        { Header: 'Location', accessor: 'location'
        }, 
        { Header: 'Confidence', accessor: 'confidence',
          Cell: row => 
          <Badge color="" className="badge-dot"> <i className={row.value == 'High' ? 'bg-success': row.value == 'Medium'? 'bg-warning': 'bg-danger'} />{row.value}</Badge>
        },
        { Header: 'Status', accessor: 'status' },
      ]

      const changeData = () => {
        
      };


    const wrapper = shallow(<Table data={data} columns={columns} changeHandler={changeData.bind(this)} />)

});

test('Test Default Column Filter', () => {
    const filter = DefaultColumnFilter({
        column: { undefined, data, ƒ (val) {
            return setFilter(column.id, val);
          }, undefined },
    })
});