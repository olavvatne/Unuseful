import React from "react";
import UIText from './UIText.js';
import UISelect from './UISelect.js';

class WeightField extends React.Component {

    constructor() {
        super();
        this._validateWeight = this._validateNumber.bind(this, 'weight', 'weightNotNumber');
        this.state = {weightNotNumber: null};
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
        if(!this.refs.weight) {
            return null;
        }
        var unit = this.unitSelect.current.state.value;
        var weight = this.refs.weight.getValue();
        if(unit === WeightField.KG) {
            return weight;
        }
        else if(unit === WeightField.LBS) {
            return weight * 0.45359237;
        }
        else {
            return weight
        }
    }

    render() {
        let units = [
            { payload: WeightField.KG, text: 'kg' },
            { payload: WeightField.LBS, text: 'lbs' },
        ];

        return (
            <div style={{display: 'inline-flex'}}>
              <UIText labelText="Weight" ref="weight"
                errorText={this.state.weightNotNumber}
                onChange={this._validateWeight}
                validationPattern="\d+(\.\d*)?"/>
              <UISelect menuItems={units} value={units[0]} ref={this.unitSelect}
                labelText="Unit"/>
            </div>
        );
    }
};

WeightField.KG = '1';
WeightField.LBS = '2';

module.exports = WeightField;
