!function(){function e(t,n,r){function a(u,l){if(!n[u]){if(!t[u]){var i="function"==typeof require&&require;if(!l&&i)return i(u,!0);if(o)return o(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[u]={exports:{}};t[u][0].call(f.exports,function(e){return a(t[u][1][e]||e)},f,f.exports,e,t,n,r)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)a(r[u]);return a}return e}()({1:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var a=r(e("react")),o=r(e("react-dom")),u=r(e("./weekNumber"));o.default.render(a.default.createElement(u.default,null),document.getElementById("tool-root-mount"))},{"./weekNumber":2,react:"react","react-dom":"react-dom"}],2:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=r(e("react")),c=r(e("moment")),f=function(e){function t(){a(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={weeknumber:null,weekStart:null,weekEnd:null},e}return u(t,e),l(t,[{key:"componentDidMount",value:function e(){var t=new Date,n=(0,c.default)(t).isoWeek(),r=(0,c.default)().day("Monday").isoWeek(n),a=(0,c.default)().day("Sunday").isoWeek(n);r=r.format("dddd[,] MMM D YYYY"),a=a.format("dddd[,] MMM D YYYY"),this.setState({weeknumber:n,weekStart:r,weekEnd:a})}},{key:"render",value:function e(){return i.default.createElement("div",{className:"mui-container"},i.default.createElement("div",{className:"mui-row"},i.default.createElement("div",{className:"mui-col-md12"},i.default.createElement("div",{className:"mui--text-accent mui--text-center",id:"weeknumber"},this.state.weeknumber))),i.default.createElement("div",{className:"mui-row"},i.default.createElement("div",{className:"mui-col-md12 mui--text-center"},i.default.createElement("p",null,"This week started at ",i.default.createElement("b",null,this.state.weekStart)," and ends at ",i.default.createElement("b",null,this.state.weekEnd),"."))))}}]),t}(i.default.Component);t.exports=f},{moment:"moment",react:"react"}]},{},[1]);
//# sourceMappingURL=entry.bundle.js.map