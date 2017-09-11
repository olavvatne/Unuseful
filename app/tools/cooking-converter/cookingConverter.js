import React from 'react';
import UIButton from '../../common/UIButton';
import UIText from '../../common/UIText';
import Slider from 'react-slick';
import MobileDetect from 'mobile-detect';

class CookingConverter extends React.Component {

  constructor(props) {
    super(props);
    this.md = new MobileDetect(window.navigator.userAgent);
    this.state = {
      inputValue: 0,
      selected: "lb",
      selectedFood: "Lentil",
    };
  }
  _unitClicked(unit, stateParam) {
    this.setState({[stateParam]: unit.name})
  }

  _valueEntered(value) {
    this.setState({inputValue: value});
  }

  _foodSelected(name,) {
      this.setState({selectedFood: name});
  }
  _getCurrentUnits() {
    // Temperature does not have anything to do with the food items.
    // Split units into two. The different subsets will utilize altered UIs.
    if (this.state.selected === 'c' || this.state.selected === 'f') {
      return [CookingConverter.units[4], CookingConverter.units[5]];
    }
    else {
      return [CookingConverter.units[0], CookingConverter.units[1], CookingConverter.units[2], CookingConverter.units[3]];
    }
  }

  renderUnitButtons(stateParam) {
    return CookingConverter.units.map((unit) => {
      return (
        <UIButton
          key={unit.name}
          label={unit.pretty}
          primary={this.state[stateParam] === unit.name}
          onClick={() => {this._unitClicked(unit, stateParam)}} />
        );
    });
  }

  renderFoodSliderItems() {
      return CookingConverter.foodItems.map((item) => {
        const sel = item.name === this.state.selectedFood ? "food-selected" : "";
        return (
          <div key={item.name}
            className="food-item"
            onClick={()=> this._foodSelected(item.name)}
            >
            <div className={'image-container-mobile ' + sel}>
              <p>{item.name}</p>
              <img src={'/public/images/cooking/' + item.image + '.png'}/>
            </div>
          </div>
        );
      })
  }

  renderFoodItems() {
    return CookingConverter.foodItems.map((item) => {
      const sel = item.name === this.state.selectedFood ? "food-selected" : "";
      return (
        <div key={item.name}
          className={'image-container-desktop ' + sel}
          onClick={()=> this._foodSelected(item.name)}>
          <p>{item.name}</p>
          <img src={'/public/images/cooking/' + item.image + '.png'}/>
        </div>
      );
    })
  }

  // Explanatory header. First check if c or f. And only then render the food converters
  renderConvertHeader() {
    const val = this.state.inputValue;
    const sel = this.state.selected;

    if (sel == 'c') {
        return (<th>{val} &ordm;C in &ordm;F </th>);
    }
    else if (sel == 'f') {
      return (<th>{val} &ordm;F in &ordm;C </th>);
    }

    const un = this._getCurrentUnits();
    const n = un.length;
    return un.map((unit) => {
      if (unit.name === sel) {
        return null;
      }

      return (
        <th key={unit.name} width={n+"%"}>
          {val} {sel} {CookingConverter.trunc(this.state.selectedFood, 8)} in {unit.name}
        </th>
      )
    });
  }

  // Render result in a table. First check if c or f. Then food if not temperature.
  renderResultItems() {
    const val = this.state.inputValue;
    const selected = this.state.selected;

    if (selected == 'c') {
        return (<td>{CookingConverter.converters['c->f'](val).toFixed(2)}</td>);
    }
    else if (selected == 'f') {
      return (<td>{CookingConverter.converters['f->c'](val).toFixed(2)}</td>);
    }

    const un = this._getCurrentUnits();
    return un.map((unit) => {
      if (unit.name === selected) {
        return null;
      }
      const inputUnit = CookingConverter.units.filter(i => i.name === this.state.selected)[0];
      const food = CookingConverter.foodItems.filter(i => i.name === this.state.selectedFood)[0];
      return (
        <td key={unit.name}>
          {CookingConverter.convert(val, inputUnit, unit, food).toFixed(2)}
        </td>
      )
    });
  }

  render() {
    const isFoodRelated = this.state.selected !== 'c' && this.state.selected !== 'f';
    const resultClass = !isFoodRelated ? 'temp-result' : '';

    return (
      <div className="cooking-wrapper">
        <div className="cooking-content">
        <div className="cooking-units">
          { this.renderUnitButtons("selected") }
        </div>
          <UIText labelText={"Measure in " + this.state.selected}
            validationPattern="^(?:[1-9]\d*|0)?(?:\.\d+)?$"
            style={{width: "60%", margin: "auto"}}
            onChange={(val) => {this._valueEntered(val)}}
            autofocus/>

          {isFoodRelated ?
            <div className="food-item-selector">
            {this.md.mobile() ?
                <Slider {...CookingConverter.foodSlider}>
                  {this.renderFoodSliderItems()}
                </Slider> :
                this.renderFoodItems()
            }
            </div> :
          null}

          {isFoodRelated ? <br className="separator" /> : null}

          <div className={'cooking-result ' + resultClass}>
            <table>
              <thead>
              <tr>
                {this.renderConvertHeader()}
              </tr>
              </thead>
              <tbody>
                <tr>
                  {this.renderResultItems()}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

CookingConverter.units = [
  {name: "lb", pretty: "lb", fullName: "pound", idx: 0},
  {name: "kg", pretty: "kg", fullName: "kilogram", idx: 1},
  {name: "dl", pretty: "dl", fullName: "decilitres", idx: 2},
  {name: "cup", pretty: "cup", fullName: "US ( and not imperial) cup", idx: 3},
  {name: "c", pretty: "\u00B0c", fullName: "Celcius", idx: -1},
  {name: "f", pretty: "\u00B0f", fullName: "Farenheit", idx: -1},
];

CookingConverter.foodItems = [
  {name: "Rice", image: "rice", kgToDl: 13.217},
  {name: "Lentil", image: "lentils", kgToDl: 12.322},
  {name: "Flour", image: "flour", kgToDl: 18.927},
  {name: "Water", image: "water", kgToDl: 10.0},
  {name: "Macaroni", image: "macaroni", kgToDl: 28.165},
  {name: "Sugar", image: "sugar", kgToDl: 11.829},
  {name: "Beans", image: "beans", kgToDl: 14.974},
  {name: "Quinoa", image: "quinoa", kgToDl: 13.917},
  {name: "Penne", image: "penne", kgToDl: 24.904},
  {name: "Butter", image: "butter", kgToDl: 10.4},
  {name: "Leafy greens", image: "greens", kgToDl: 65.719},
]

CookingConverter.foodSlider = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2
}

CookingConverter.converters = {
  "kg->lb": (x) => 2.20462 *x,
  "lb->kg": (x) => 0.453592 * x,
  "cup->dl": (x) => 2.36588 * x,
  "dl->cup": (x) => 0.422675 * x,
  "f->c": (x) => (x - 32) / 1.8,
  "c->f": (x) => (x * 1.8) + 32,
}

CookingConverter.convert = (inputValue, inputUnit, outputUnit, foodItem) => {

  const convertDirectional = (order, food) => {
    // From LB to KG
    let first = inputValue;
    if (inputUnit.name === order[0]) {
      first = CookingConverter.converters[order[0] + '->' + order[1]](inputValue);
    }

    // Return KG if that is wanted output
    if (outputUnit.name === order[1]) {
      return first;
    }

    // From KG to DL, and return if that is wanted output
    let second = first;
    if (inputUnit.name === order[1] || inputUnit.name === order[0]) {
      //If the food convertion is necessary. Not necessary if from dl to cups
      second = food * first;
    }

    if (outputUnit.name === order[2]) {
      return second;
    }

    // From DL to CUPS (US) and return
    if (outputUnit.name === order[3]) {
      return CookingConverter.converters[order[2] + '->' + order[3]](second);
    }

    // convertion failed
    throw new Error("Convertion did not work");
  }

  const unitOrder = ['lb', 'kg', 'dl', 'cup'];
  const direction = inputUnit.idx - outputUnit.idx;
  if (direction < 0) {
    return convertDirectional(unitOrder, foodItem.kgToDl);
  }
  else if (direction > 0) {
    return convertDirectional(unitOrder.reverse(), 1/foodItem.kgToDl);
  }

  return -1;
}

//Convenience truncator
CookingConverter.trunc = (s, n) => {
  if (!s) {
    return s;
  }
return s.substr(0,n-1)+(s.length>n?'...':'');
};

module.exports = CookingConverter;
