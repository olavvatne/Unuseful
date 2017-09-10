/**
 * Created by Olav on 10/2/2015.
 */
import React from "react";

class UIText extends React.Component {
    constructor() {
        super();
        this._handle = this._handleChange.bind(this);
        this.state = { value: ""};
    }

    componentDidMount() {
      if (this.props.autofocus) {
        this.refs.element.focus();
      }
    }

    getValue() {
        //TODO: State not updated itself before getValue is called. Results in form being one
        //character behind. FindDomNode works! Is this the best way of doing things?
        return this.refs.element.value;
    }

    reset() {
      this.setState({value: ""});
    }

    _handleChange(event) {
        //TODO: Necessary to set state?
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    }
    render() {
        //TODO: Handle errors

        //var errorText = (<small style={{"position":"absolute", "color": "red"}}>Not a number</small>)
        return (
          <div className="mui-textfield mui-textfield--float-label" style={{margin: '5px'}}>
            <input ref="element" type="text"
             value={this.state.value}
             onChange={this._handle}
             pattern={this.props.validationPattern}
             style={this.props.style}/>
            <label>{this.props.labelText}</label>
          </div>
        )
    }
};

module.exports = UIText;
