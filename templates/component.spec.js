import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
//import sinon from 'sinon'; uncomment if you need to  handle JS Events / Mocks / ...
import ComponentName from './ComponentName';

describe('<ComponentName />', () => {

  it('has .ComponentClass has wrapping class', () => {
    const wrapper = shallow(<ComponentName />);
    expect(wrapper.find('.ComponentClass')).to.have.length(1);
  });

});