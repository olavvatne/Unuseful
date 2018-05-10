/**
 * Created by Olav on 10/2/2015.
 */
import React from "react";

class UISelect extends React.Component {
    constructor() {
        super();
        this.state = { value: ""};
    }

    componentWillMount() {
        this.setState({
            value: this.props.value
        })
    }

    handleChange(event) {
        var value = event.target.value;
        this.setState({value: value});
    }

    getValue() {
        return this.state.value;
    }

    render() {
        let items = this.props.menuItems.map(menu => {
            return (<option key={menu.payload} value={menu.payload}>{menu.text}</option>)
        });
        //TODO: Change state!
        return (
             <div className="mui-select" style={{margin: '5px'}}>
                 <select onChange={(evt) => this.handleChange(evt)}
                     style={this.props.style}>
                     {items}
                 </select>
            </div>
        )
    }
};

module.exports = UISelect;
