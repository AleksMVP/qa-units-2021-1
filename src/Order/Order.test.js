import React from 'react'
import Order from './Order';
import {getDate} from '../utils/getDate';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {fakeOrders} from '../data/fakeOrders';

jest.mock('../utils/getDate');
configure({ adapter: new Adapter() });

describe('Order.js', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('Function call test', () => {
    getDate.mockReturnValue("15 марта, чт, 2021 год");

    const order = fakeOrders[1];
    const wrapper = shallow(<Order 
      order={order}
    />);
    
    expect(getDate).toHaveBeenCalledTimes(1);
  });

  it('Snapshot test', () => {
    getDate.mockReturnValue("15 марта, чт, 2021 год");

    const order = fakeOrders[1];
    const wrapper = shallow(<Order 
      order={order}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('Bad object', () => {
    getDate.mockReturnValue("15 марта, чт, 2021 год");

    const wrapper = shallow(<Order 
      bober={{}}
    />);

    expect(wrapper.getElement()).toEqual(null);
  });

  it('Bad object', () => {
    getDate.mockReturnValue("15 марта, чт, 2021 год");

    const order = fakeOrders[0];
    const wrapper = shallow(<Order 
      order={{}}
    />);
    
    expect(wrapper.getElement()).toEqual(null);
  });
});

