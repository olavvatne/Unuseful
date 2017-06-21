/**
 * Created by Olav on 10/3/2015.
 */
import React from "react";

class UIButton extends React.Component {
    constructor() {
        //TODO: Color option, and raised flat etc
        super();
    }

    render() {

        var primary = this.props.primary ? "mui-btn--primary" : "";
        const customClasses = `mui-btn mui-btn--raised ${primary} ${this.props.className}`;
        return (
            <button className={customClasses}
                    data-mui-color={primary}
                onClick={this.props.onClick}
                style={this.props.style}>
            {this.props.label}
        </button>
        )
    }
};

module.exports = UIButton;
