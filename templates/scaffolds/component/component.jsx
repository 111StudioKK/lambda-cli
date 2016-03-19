import React from 'react';
// Scaffold imports
import './{{name}}.less';
{{imports}}
// End scaffold imports


class {{name}} extends React.Component {

  constructor(props) {
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

{{name}}.description = '{{description}}';

{{name}}.propTypes = {

}

export default {{name}};

//Unit test entry point
export const _{{name}} = {{name}};