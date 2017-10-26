var React = require("react");
var LanguageSelector = require("./LanguageSelector");

class App extends React.Component{
	render(){
		return (
			<div className="container"> 
				<LanguageSelector />
			</div>
			)
	}
}

module.exports = App;