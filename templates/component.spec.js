import React from 'react';
import { shallow, mount } from 'enzyme';
//import sinon from 'sinon'; uncomment if you need to  handle JS Events / Mocks / ...
import ComponentName from './ComponentName';

describe('<ComponentName />', () => {

  it('calls componentDidMount', () => {
    const wrapper = mount(<ComponentName />);
    expect(Foo.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('has .ComponentClass has wrapping class', () => {
    const wrapper = shallow(<ComponentName />);
    expect(wrapper.find('.ComponentClass')).to.have.length(1);
  });

});