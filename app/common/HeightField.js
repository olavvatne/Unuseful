import React from "react";
import UIText from './UIText.js';
import UISelect from './UISelect.js';


class HeightField extends React.Component {

    constructor() {
        super();
        this._validateHeight = this._validateNumber.bind(this, 'height', 'heightNotNumber');
        this.state = {heightNotNumber: null};
        this.unitSelect = React.createRef();
    }


    //TODO: Create generalized operation class; Duplicate!
    _validateNumber(stateName, errorName) {
        var v = this.refs[stateName].getValue();
        var regex = /^[0-9]+([,.][0-9]+)?$/g;
        if(!regex.test(v) && v.length > 0) {
            console.log("ERROR");
            this.setState({[errorName]: 'Not a number'});
        }
        else if(this.state[errorName]) {
            this.setState({[errorName]: null});
        }
    }

    getValue() {
        if(!this.refs.height) {
            return null;
        }

        var height = this.refs.height.getValue();
        var unit = this.unitSelect.current.getValue();
        if(unit === HeightField.CM) {
            return height;
        }
        else if(unit === HeightField.INCHES) {
            return height * 2.54;
        }
        else {
            return height
        }
    }

    render() {
        let units = [
            { payload: HeightField.CM, text: 'cm' },
            { payload: HeightField.INCHES, text: 'inches' },
        ];

        return (
            <div style={{display: 'inline-flex'}}>
                <UIText labelText="Height" ref="height"
                  errorText={this.state.heightNotNumber}
                  onChange={this._validateHeight}
                  validationPattern="\d+(\.\d*)?"/>
                <UISelect menuItems={units}  value={units[0]} ref={this.unitSelect}
                  labelText="Unit"/>
            </div>
        );
    }
};

HeightField.CM = '1';
HeightField.INCHES = '2';

module.exports = HeightField;
