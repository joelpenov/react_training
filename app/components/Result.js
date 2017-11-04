var React = require("react");

class Result extends React.Component{
	render(){
		console.log(this.props);
		return (
			<div>
				Result
			</div>
			)
	}
}

module.exports = Result;