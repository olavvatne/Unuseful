/**
 * Created by Olav on 10/10/2015.
 */
import React from "react";
import UIButton from './UIButton.js';

class UIIncrementButton extends React.Component {
    constructor() {
        super();
        this._up = this._adjustParagraphCount.bind(this, 1);
        this._down = this._adjustParagraphCount.bind(this, -1);
        this.state = {count: 0}
    }

    componentWillMount() {
        this.setState({count: parseInt(this.props.initvalue)});
    }

    _adjustParagraphCount(inc) {
        //TODO: add Maximum as well.
        var count = Math.max(this.props.minimum,this.state.count + inc);

        this.setState({count: count});
        this.props.onAdjust(inc);
    }

    getValue() {
        return this.state.count;
    }

    render() {
      const buttonStyle = {
        marginLeft: "0.7em",
        marginRight: "1em",
        marginTop: '0.4em',
        fontSize: "1.8em"
      };

      return (
        <div style={this.props.style}>
          <UIButton
              label="-"
              primary={false}
              onClick={this._down} />
              <span style={buttonStyle}>{this.state.count}</span>
          <UIButton
          label="+"
          primary={false}
          onClick={this._up} />
      </div>
      )
    }
};

module.exports = UIIncrementButton;
