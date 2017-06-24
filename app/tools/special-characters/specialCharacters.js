import React from "react";
import clipboard from 'clipboard-js';

class SpecialCharacters extends React.Component {

    constructor() {
        super();
        this.state = {selection: null, hide: false};
        this._onCopyHandler = this._onCopy.bind(this);
    }

    _getCharacters() {
        return [
            {name: "For all", code: "8704"},
            {name: "Summation", code: "8721"},
            {name: "Product", code: "8719"},
            {name: "Exists", code: "8707"},
            {name: "Union", code: "8745"},
            {name: "Intersection", code: "8746"},
            {name: "Square root", code: "8730"},
            {name: "Empty", code: "8709"},
            {name: "Almost equal", code: "8776"},
            {name: "Subset", code: "8838"},
            {name: "Proper subset", code: "8834"},
            {name: "Superset", code: "8835"},
            {name: "Proper superset", code: "8839"},
            {name: "Logical and", code: "8743"},
            {name: "Logical not", code: "8744"},
            {name: "Infinity", code: "8734"},
            {name: "Integral", code: "8747"},
            {name: "Double integral", code: "8748"},
            {name: "Product sign", code: "8901"},
            {name: "Division sign", code: "247"},
            {name: "Element of", code: "8712"},
            {name: "Contains", code: "8715"},
            {name: "Difference", code: "8711"},

            {name: "Omega", code: "937"},
            {name: "Phi", code: "934"},
            {name: "Theta", code: "952"},
            {name: "Eta", code: "951"},
            {name: "Mu", code: "956"},
            {name: "Micro", code: "181"},

            {name: "Tilde", code: "126"},
            {name: "Chess king", code: "9812"},
            {name: "Male", code: "9794"},
            {name: "Female", code: "9792"},
            {name: "Per mille", code: "8240"},
            {name: "One quarter", code: "188"},
            {name: "One half", code: "189"},
            {name: "Three quarter", code: "190"},
            {name: "Left arrow", code: "8592"},
            {name: "Up arrow", code: "8593"},
            {name: "Right arrow", code: "8594"},
            {name: "Down arrow", code: "8595"},
            {name: "Check mark", code: "10003"},
            {name: "Copyright", code: "169"},
            {name: "Trade mark", code: "8482"},
            {name: "Registered", code: "174"}
        ];
    }

    _onCopy(char) {
        this.setState({selection: char})
    }

    componentDidMount() {
        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        var is_safari = navigator.userAgent.indexOf("Safari") > -1;
        if ((is_chrome)&&(is_safari)) {is_safari=false;}
        if(is_safari) {
            this.setState({hide: true});
        }
    }

    render() {
        var data = this._getCharacters();
        var characters =  data.map(char => {
           return (
               <Character char={char} onCopy={this._onCopyHandler}></Character>
           )
        });
        //TODO: Pass down a className instead, for easier styling.
        var s = "view";
        return (
            <div>
                <div className="mui-container">
                    <div className="mui-row">
                      {!this.state.hide?
                      <Character char={this.state.selection} className={s}></Character>
                      : null}
                    </div>
                    <div className="mui-row">
                        {characters}
                    </div>

                </div>
            </div>
        );
    }
}

class Character extends React.Component {

    constructor() {
        super();
        this._handle = this._copy.bind(this)
    }

    _copy(event) {
        //TODO: Somehow import clipboard instead of include using scripttag in html.
        clipboard.copy(String.fromCharCode(this.props.char.code));
        this.props.onCopy(this.props.char);
    }
    render() {
        //TODO: Click to copy and select-right-click and copy possible for both pc and smartphones?
        return (
            <div className={this.props.className + ' character-container'} onClick={this._handle} style={this.props.style}>
                {this.props.char ?
                    [<p className="character-container__img">{String.fromCharCode(this.props.char.code)}</p>,
                    <p className="character-container__description">
                        {this.props.char.name}
                    </p>]
                :<p style={{marginTop: '20px'}}>No selection in your clipboard</p> }
            </div>
        );
    }
}

module.exports = SpecialCharacters;
