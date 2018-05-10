import React from 'react';
import PropTypes from 'prop-types'
import UIButton from '../../common/UIButton.js';
import UISelect from '../../common/UISelect.js';

class Dice extends React.Component {

    constructor() {
        super();
        this._handleRoll = this._handleRoll.bind(this);
        this._handleAddDie = this._addDie.bind(this);
        this._generateImagePath = this._getImagePath.bind(this);
        this.defaultEyes = 6;
        this.state = {
            dice: []
        };
    }

    _getImagePath(eyes, number) {
        return "/public/images/dice/" + eyes + "-128/" + eyes + "-" + number + ".png";
    }

    _addDie() {
        var dice = this.state.dice;
        var eyes = this.refs.dieEyes.getValue();
        var number = 1;
        var imagePath = this._generateImagePath(eyes, number);

        console.log("adding: ", eyes, number, imagePath);

        dice.push({
            eyes: eyes,
            number: number,
            imagePath: imagePath
        });
        this.setState({
            dice: dice
        });
    }

    _handleRoll() {

        var dice = this.state.dice;
        if (dice.length === 0) {
            return;
        }

        var newDice = [];

        for (var i = 0; i < dice.length; i++) {
            var d = dice[i];
            var number = (Math.floor(Math.random() * d.eyes) + 1);
            //console.log("new die: ", d.eyes, "number: ", number);
            var eyes = d.eyes;

            var imagePath = this._generateImagePath(eyes, number);

            newDice.push({
                eyes: d.eyes,
                number: number,
                imagePath: imagePath
            });
        }

        this.setState({
            dice: newDice
        });
    }

    render() {

        var dieEyes = [
            { payload: 4, text: "4"},
            { payload: 6, text: "6"},
            { payload: 8, text: "8"},
            { payload: 10, text: "10"},
            { payload: 12, text: "12"},
            { payload: 20, text: "20"}
        ];

        var dice = this.state.dice.map(d => {
            return (
                <Die number={d.number} imagePath={d.imagePath}/>
            );
        });

        return (
            <div className="mui-container">
                <div className="mui-row" id="die-options-row">
                    <div className="mui-col-md-6">
                        <UIButton
                            label="Add die"
                            primary={false}
                            onClick={this._handleAddDie} />
                        <UISelect
                            menuItems={dieEyes}
                            ref="dieEyes"
                            value={this.defaultEyes}
                            labelText="Eyes"
                            style={{width: "100px", marginLeft: "30px"}}/>
                    </div>
                    <div className="mui-col-md-6">
                        <UIButton
                            label="Roll"
                            primary={true}
                            onClick={this._handleRoll}
                            style={{width: "150px"}}/>
                    </div>
                </div>
                <div className="mui-row">
                    <div className="mui-text-center">
                        <div className="mui-col-md-12" id="dices-row">
                            {dice}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Die extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="dice-row">
                <img src={this.props.imagePath} alt={this.props.number} width="60" height="60"/>
            </div>
        );
    }
}



Die.PropTypes = {
    number: PropTypes.number.isRequired
};
Die.defaultProps = {
    number: 1
};

module.exports = Dice;

//
// <!--<h1>{this.props.number}</h1>-->
