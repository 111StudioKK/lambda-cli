import React from 'react';
import { render } from 'react-dom';
import './styles/config.less';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="">
        <h1>AppName</h1>
        <p>AppDescription</p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));