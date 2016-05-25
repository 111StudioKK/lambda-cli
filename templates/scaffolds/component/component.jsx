import React from 'react';
import './{{name}}.less';

type Props = {

}

class {{name}} extends React.Component {

  description: '{{description}}'

  props: Props

  constructor(props: Props) {
    super(props);
  }

  /* Component Custom Methods */
  /* End Component Custom Methods */

  /* React Component LifeCycle Methods */
  //componentWillMount() {}
  //componentDidMount() {}
  //componentWillReceiveProps(nextProps) {}
  //shouldComponentUpdate(nextProps, nextState) {}
  //componentWillUpdate(nextProps, nextState) {}
  //componentDidUpdate(prevProps, prevState) {}
  //componentWillUnmount() {}
  render() {
    return (
      <div className="{{class}}">
        <h1>{{name}}</h1>
        <p>{{description}}</p>
      </div>
    );
  }
  /* End React Component LifeCycle Methods */
}

export default {{name}};

//Unit test entry point
export const _{{name}} = {{name}};