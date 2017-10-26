var React = require("react");
var ReactDom = require("react-dom");
var PropTypes = require("prop-types");
var App = require("./components/App");

require("./style.css");

ReactDom.render(<App/>, document.getElementById("app"));