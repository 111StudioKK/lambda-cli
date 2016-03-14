import React from 'react';
import { shallow, mount } from 'enzyme';
//import sinon from 'sinon'; uncomment if you need to  handle JS Events / Mocks / ...
import Comment from './Comment';

describe('<Comment />', () => {

  it('calls componentDidMount', () => {
    const wrapper = mount(<Comment />);
    expect(Foo.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('has .comment has wrapping class', () => {
    const wrapper = shallow(<Comment />);
    expect(wrapper.find('.comment')).to.have.length(1);
  });

});