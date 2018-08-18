import React from 'react';
import UIText from '../../common/UIText';

class BinaryConverter extends React.Component {

  constructor(props) {
    super(props);
  }
  
  _numberTextChanged(val, base) {
    if (this._isFieldEmpty(val)) {
      _resetAllFieldsExceptBase(base);
    }
    else if (!(new RegExp(this._getPatternFromBase(base)).test(val))) {
      this._resetAllFieldsExceptBase(base);
    }
    else {
      this._updateAllFields(val, base);
    }
    
  }

  _getPatternFromBase(base) {
    if (base === 2) return BinaryConverter.BinaryPattern;
    else if (base === 16) return BinaryConverter.HexPattern;
    else if (base === 8) return BinaryConverter.OctalPattern;
    else return BinaryConverter.IntegerPattern;
  }
  _updateAllFields(val, base) {
    if (base !== 2) this.refs.binary.setValue(BinaryConverter.Convert(val).from(base).to(2));
    if (base !== 10) this.refs.integer.setValue(BinaryConverter.Convert(val).from(base).to(10));
    if (base !== 8) this.refs.octal.setValue(BinaryConverter.Convert(val).from(base).to(8));
    if (base !== 16) this.refs.hex.setValue(BinaryConverter.Convert(val).from(base).to(16).toUpperCase());
  }

  _isFieldEmpty(val) {
    return val === null || val === "";
  }

  _resetAllFieldsExceptBase(base) {
    if (base !== 2) this.refs.binary.setValue("");
    if (base !== 16) this.refs.hex.setValue("");
    if (base !== 10) this.refs.integer.setValue("");
    if (base !== 8) this.refs.octal.setValue("");
  }

  render() {
    return (
      <div className="mui-container">
        <div className="converter-wrapper mui-row">
          <div className="converter-entry mui-col-md-3 mui-col-xs-6">
              <h2>Binary</h2>
              <UIText ref="binary"
                validationPattern={BinaryConverter.BinaryPattern}
                onChange={(val) => {this._numberTextChanged(val, 2)}}/>
          </div>
          <div className="converter-entry mui-col-md-3 mui-col-xs-6">
              <h2>Hex</h2>
              <UIText ref="hex"
                validationPattern={BinaryConverter.HexPattern}
                onChange={(val) => {this._numberTextChanged(val, 16)}}/>
          </div>
          <div className="converter-entry mui-col-md-3 mui-col-xs-6">
              <h2>Decimal</h2>
              <UIText ref="integer"
                validationPattern={BinaryConverter.IntegerPattern}
                onChange={(val) => {this._numberTextChanged(val, 10)}}/>
          </div>
          <div className="converter-entry mui-col-md-3 mui-col-xs-6">
              <h2>Octal</h2>
              <UIText ref="octal"
                validationPattern={BinaryConverter.OctalPattern}
                onChange={(val) => {this._numberTextChanged(val, 8)}}/>
          </div>
        </div>
      </div>
    );
  }
}

BinaryConverter.HexPattern = "^[a-fA-F0-9]+$";
BinaryConverter.IntegerPattern = "^\\d+$";
BinaryConverter.BinaryPattern = "^[0-1]+$";
BinaryConverter.OctalPattern = "^[0-7]+$";

BinaryConverter.Convert = function (num) {
  return {
      from : function (baseFrom) {
          return {
              to : function (baseTo) {
                  return parseInt(num, baseFrom).toString(baseTo);
              }
          };
      }
  };
};

module.exports = BinaryConverter;