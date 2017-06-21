import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json';

class HelloMessage extends React.Component {
  render() {
    return (<div className="reactContent">
      <p>This is a React component</p>
      <p className="subtext">{this.props.name}</p>
    </div>);
  }
}
console.log(data.reactVar);
console.log("data.reactVar");
ReactDOM.render(<HelloMessage name={data.reactVar} />, document.getElementById('react-root-mount') );
