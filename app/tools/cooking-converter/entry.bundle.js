!function(){function e(t,n,r){function a(l,u){if(!n[l]){if(!t[l]){var i="function"==typeof require&&require;if(!u&&i)return i(l,!0);if(o)return o(l,!0);var c=new Error("Cannot find module '"+l+"'");throw c.code="MODULE_NOT_FOUND",c}var s=n[l]={exports:{}};t[l][0].call(s.exports,function(e){return a(t[l][1][e]||e)},s,s.exports,e,t,n,r)}return n[l].exports}for(var o="function"==typeof require&&require,l=0;l<r.length;l++)a(r[l]);return a}return e}()({1:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=r(e("react")),c=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return l(t,e),u(t,[{key:"render",value:function e(){var t=this.props.primary?"mui-btn--primary":"",n="mui-btn mui-btn--raised "+t+" "+this.props.className;return i.default.createElement("button",{className:n,"data-mui-color":t,onClick:this.props.onClick,style:this.props.style},this.props.label)}}]),t}(i.default.Component);t.exports=c},{react:"react"}],2:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=r(e("react")),c=function(e){function t(){a(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e._handle=e._handleChange.bind(e),e.state={value:""},e}return l(t,e),u(t,[{key:"componentDidMount",value:function e(){this.props.autofocus&&this.refs.element.focus()}},{key:"getValue",value:function e(){return this.refs.element.value}},{key:"setValue",value:function e(t){this.setState({value:t})}},{key:"isValid",value:function e(){return this.refs.element.validity.valid}},{key:"reset",value:function e(){this.setState({value:""})}},{key:"_handleChange",value:function e(t){this.setState({value:t.target.value}),this.props.onChange(t.target.value)}},{key:"render",value:function e(){return i.default.createElement("div",{className:"mui-textfield mui-textfield--float-label",style:{margin:"5px"}},i.default.createElement("input",{ref:"element",type:"text",value:this.state.value,onChange:this._handle,pattern:this.props.validationPattern,style:this.props.style}),i.default.createElement("label",null,this.props.labelText))}}]),t}(i.default.Component);t.exports=c},{react:"react"}],3:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=r(e("react")),s=r(e("../../common/UIButton")),f=r(e("../../common/UIText")),d=r(e("react-slick")),m=r(e("mobile-detect")),p=function(e){function t(e){o(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.md=new m.default(window.navigator.userAgent),n.state={inputValue:0,selected:"lb",selectedFood:"Lentil"},n}return u(t,e),i(t,[{key:"_unitClicked",value:function e(t,n){this.setState(a({},n,t.name))}},{key:"_valueEntered",value:function e(t){this.setState({inputValue:t})}},{key:"_foodSelected",value:function e(t){this.setState({selectedFood:t})}},{key:"_getCurrentUnits",value:function e(){return"c"===this.state.selected||"f"===this.state.selected?[t.units[4],t.units[5]]:[t.units[0],t.units[1],t.units[2],t.units[3]]}},{key:"renderUnitButtons",value:function e(n){var r=this;return t.units.map(function(e){return c.default.createElement(s.default,{key:e.name,label:e.pretty,primary:r.state[n]===e.name,onClick:function t(){r._unitClicked(e,n)}})})}},{key:"renderFoodSliderItems",value:function e(){var n=this;return t.foodItems.map(function(e){var t=e.name===n.state.selectedFood?"food-selected":"";return c.default.createElement("div",{key:e.name,className:"food-item",onClick:function t(){return n._foodSelected(e.name)}},c.default.createElement("div",{className:"image-container-mobile "+t},c.default.createElement("p",null,e.name),c.default.createElement("img",{src:"/public/images/cooking/"+e.image+".png"})))})}},{key:"renderFoodItems",value:function e(){var n=this;return t.foodItems.map(function(e){var t=e.name===n.state.selectedFood?"food-selected":"";return c.default.createElement("div",{key:e.name,className:"image-container-desktop "+t,onClick:function t(){return n._foodSelected(e.name)}},c.default.createElement("p",null,e.name),c.default.createElement("img",{src:"/public/images/cooking/"+e.image+".png"}))})}},{key:"renderConvertHeader",value:function e(){var n=this,r=this.state.inputValue,a=this.state.selected;if("c"==a)return c.default.createElement("th",null,r," ºC in ºF ");if("f"==a)return c.default.createElement("th",null,r," ºF in ºC ");var o=this._getCurrentUnits(),l=o.length;return o.map(function(e){return e.name===a?null:c.default.createElement("th",{key:e.name,width:l+"%"},r," ",a," ",t.trunc(n.state.selectedFood,8)," in ",e.name)})}},{key:"renderResultItems",value:function e(){var n=this,r=this.state.inputValue,a=this.state.selected;return"c"==a?c.default.createElement("td",null,t.converters["c->f"](r).toFixed(2)):"f"==a?c.default.createElement("td",null,t.converters["f->c"](r).toFixed(2)):this._getCurrentUnits().map(function(e){if(e.name===a)return null;var o=t.units.filter(function(e){return e.name===n.state.selected})[0],l=t.foodItems.filter(function(e){return e.name===n.state.selectedFood})[0];return c.default.createElement("td",{key:e.name},t.convert(r,o,e,l).toFixed(2))})}},{key:"render",value:function e(){var n=this,r="c"!==this.state.selected&&"f"!==this.state.selected,a=r?"":"temp-result";return c.default.createElement("div",{className:"cooking-wrapper"},c.default.createElement("div",{className:"cooking-content"},c.default.createElement("div",{className:"cooking-units"},this.renderUnitButtons("selected")),c.default.createElement(f.default,{labelText:"Measure in "+this.state.selected,validationPattern:"^(?:[1-9]\\d*|0)?(?:\\.\\d+)?$",style:{width:"60%",margin:"auto"},onChange:function e(t){n._valueEntered(t)},autofocus:!0}),r?c.default.createElement("div",{className:"food-item-selector"},this.md.mobile()?c.default.createElement(d.default,t.foodSlider,this.renderFoodSliderItems()):this.renderFoodItems()):null,r?c.default.createElement("br",{className:"separator"}):null,c.default.createElement("div",{className:"cooking-result "+a},c.default.createElement("table",null,c.default.createElement("thead",null,c.default.createElement("tr",null,this.renderConvertHeader())),c.default.createElement("tbody",null,c.default.createElement("tr",null,this.renderResultItems()))))))}}]),t}(c.default.Component);p.units=[{name:"lb",pretty:"lb",fullName:"pound",idx:0},{name:"kg",pretty:"kg",fullName:"kilogram",idx:1},{name:"dl",pretty:"dl",fullName:"decilitres",idx:2},{name:"cup",pretty:"cup",fullName:"US ( and not imperial) cup",idx:3},{name:"c",pretty:"°c",fullName:"Celcius",idx:-1},{name:"f",pretty:"°f",fullName:"Farenheit",idx:-1}],p.foodItems=[{name:"Rice",image:"rice",kgToDl:13.217},{name:"Lentil",image:"lentils",kgToDl:12.322},{name:"Flour",image:"flour",kgToDl:18.927},{name:"Water",image:"water",kgToDl:10},{name:"Macaroni",image:"macaroni",kgToDl:28.165},{name:"Sugar",image:"sugar",kgToDl:11.829},{name:"Beans",image:"beans",kgToDl:14.974},{name:"Quinoa",image:"quinoa",kgToDl:13.917},{name:"Penne",image:"penne",kgToDl:24.904},{name:"Butter",image:"butter",kgToDl:10.4},{name:"Leafy greens",image:"greens",kgToDl:65.719}],p.foodSlider={dots:!0,arrows:!1,infinite:!0,speed:500,slidesToShow:3,slidesToScroll:2},p.converters={"kg->lb":function e(t){return 2.20462*t},"lb->kg":function e(t){return.453592*t},"cup->dl":function e(t){return 2.36588*t},"dl->cup":function e(t){return.422675*t},"f->c":function e(t){return(t-32)/1.8},"c->f":function e(t){return 1.8*t+32}},p.convert=function(e,t,n,r){var a=function r(a,o){var l=e;if(t.name===a[0]&&(l=p.converters[a[0]+"->"+a[1]](e)),n.name===a[1])return l;var u=l;if(t.name!==a[1]&&t.name!==a[0]||(u=o*l),n.name===a[2])return u;if(n.name===a[3])return p.converters[a[2]+"->"+a[3]](u);throw new Error("Convertion did not work")},o=["lb","kg","dl","cup"],l=t.idx-n.idx;return l<0?a(o,r.kgToDl):l>0?a(o.reverse(),1/r.kgToDl):-1},p.trunc=function(e,t){return e?e.substr(0,t-1)+(e.length>t?"...":""):e},t.exports=p},{"../../common/UIButton":1,"../../common/UIText":2,"mobile-detect":"mobile-detect",react:"react","react-slick":"react-slick"}],4:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var a=r(e("react")),o=r(e("react-dom")),l=r(e("./cookingConverter"));o.default.render(a.default.createElement(l.default,null),document.getElementById("tool-root-mount"))},{"./cookingConverter":3,react:"react","react-dom":"react-dom"}]},{},[4]);
//# sourceMappingURL=entry.bundle.js.map
