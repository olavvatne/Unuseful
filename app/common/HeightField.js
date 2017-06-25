import React from "react";
import UIText from './UIText.js';
import UISelect from './UISelect.js';


class HeightField extends React.Component {

    constructor() {
        super();
        this._validateHeight = this._validateNumber.bind(this, 'height', 'heightNotNumber');
        this.state = {heightNotNumber: null};
    }


    //TODO: Create generalized operation class; Duplicate!
    _validateNumber(stateName, errorName) {
        var v = this.refs[stateName].getValue();
        var regex = /^[0-9]+([,.][0-9]+)?$/g;
        console.log(v);
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
        var unit = this.refs.unit.getValue();
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
        let heightUnits = [
            { payload: HeightField.CM, text: 'cm' },
            { payload: HeightField.INCHES, text: 'inches' },
        ];

        return (
            <div>
                <UIText labelText="Height" ref="height"
                        errorText={this.state.heightNotNumber}
                        onChange={this._validateHeight}
                        validationPattern="\d+(\.\d*)?"
                        style={{display: "inline-block"}}/>
                <UISelect menuItems={heightUnits} ref="unit"
                          value={this.state.heightUnit} //not used
                          labelText="Unit"
                          style={{display: "inline-block"}}/>
            </div>
        );
    }
};

HeightField.CM = '1';
HeightField.INCHES = '2';

module.exports = HeightField;
