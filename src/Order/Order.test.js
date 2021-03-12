import React from 'react'
import Order from './Order';
import {getDate} from '../utils/getDate';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {fakeOrders} from '../data/fakeOrders';

jest.mock('../utils/getDate');
getDate.mockReturnValue("15 марта, чт, 2021 год");

configure({ adapter: new Adapter() });

describe('Order.js', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  afterAll(() => {
    jest.resetModules();
  });

  it('Snapshot test', () => {
    const order = fakeOrders[1];
    const wrapper = shallow(<Order 
      order={order}
    />);
    expect(getDate).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('Bad object', () => {
    const wrapper = shallow(<Order 
      bober={{}}
    />);
    expect(getDate).toHaveBeenCalledTimes(1);
    expect(wrapper.getElement()).toEqual(null);
  });

  it('Bad object', () => {
    const order = fakeOrders[0];
    const wrapper = shallow(<Order 
      order={{}}
    />);
  
    expect(getDate).toHaveBeenCalledTimes(1);
    expect(wrapper.getElement()).toEqual(null);
  });
});

