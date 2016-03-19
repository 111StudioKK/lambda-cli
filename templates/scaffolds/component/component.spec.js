import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
//import sinon from 'sinon'; //uncomment if you need to  handle JS Events / Mocks / ...
import {_{{name}}} from './{{name}}';

describe('<{{name}} />', () => {

  it('has .{{class}} has wrapping class', () => {
    const wrapper = shallow(<_{{name}} />);
    expect(wrapper.find('.{{class}}')).to.have.length(1);
  });

});