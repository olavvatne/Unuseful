/**
 * Created by Olav on 10/2/2015.
 */
import React from "react";

class UISelect extends React.Component {
    constructor() {
        super();
        this._handle = this._handleChange.bind(this);
        this.state = { value: ""};
    }

    componentWillMount() {
        this.setState({
            value: this.props.value
        })
    }

    _handleChange(event) {
        var value = event.target.value;
        this.setState({value: value});
    }

    getValue() {
        return this.state.value;
    }

    render() {
        //TODO: Value
        let items = this.props.menuItems.map(menu => {
            return (<option value={menu.payload}>{menu.text}</option>)
        });
        //TODO: Change state!
        return (
             <div className="mui-select" >
                 <select onChange={this._handle}
                     value={this.state.value} style={this.props.style}>
                     {items}
                 </select>
            </div>
        )
    }
};

module.exports = UISelect;