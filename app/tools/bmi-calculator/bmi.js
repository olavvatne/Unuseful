import React from "react";
import WeightField from '../../common/WeightField.js';
import HeightField from '../../common/HeightField.js';
import UIButton from '../../common/UIButton.js';


class BMI extends React.Component {

    constructor() {
        super();
        this._validateHeight = this._validateNumber.bind(this, 'height', 'heightNotNumber');
        this._handleClick = this._computeBMI.bind(this);
        this.state = { heightNotNumber: null, bmi: null};
    }

    //TODO: remove, validation inside component
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

    _computeBMI() {
        if(!this.refs.weight  || !this.refs.height) {
            return null;
        }

        var weight = this.refs.weight.getValue();
        var height = this.refs.height.getValue();

        if(!weight || !height) {
            //TODO: Set error state
            console.log("No value");
            return;
        }

        var BMI = weight/Math.pow(height/100, 2);
        this.setState({bmi: BMI});
    }

    _getBMIText() {
        var bmi = this.state.bmi;
        if(!bmi) {
            return null;
        }

        if(bmi < 18.5) {
            return "Underweight";
        }
        else if(bmi <25) {
            return "Healthy";
        }
        else if(bmi <30) {
            return "Overweight";
        }
        else {
            return "Obese";
        }
    }

    render() {

        return (
            <div className="mui-container">
                <div className="mui-row">
                    <div className="mui-col-md-6">
                        <WeightField ref="weight" />
                        <HeightField ref="height" />

                        <div className="row">
                            <UIButton label="Calculate" primary={true} onClick={this._handleClick} />
                        </div>
                    </div>
                    <div className="mui-col-md-6">
                        <div className="mui-text-display4 mui-text-accent mui-text-center"
                             style={{marginTop:"20px"}}>
                            { Math.round(this.state.bmi * 100)/100 }
                        </div>
                        <p className="mui-text-display3 mui-text-accent mui-text-center">
                            { this._getBMIText() }
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};
BMI.toolMetaDescription = "Simple online BMI calculator. Compatible units include kilograms (kg) and lbs (pounds) for weight, centimetres (cm) and inches for height"

module.exports = BMI;
