var React = require("react");
var Link = require("react-router-dom").Link;
var Battle = require("./Battle");

class Home extends React.Component{
	render() {
		return (
				<div className="home-container">
					<h1>Github battle: battle your friends and win!</h1>
					<Link className="button-animated button" to="/battle">
						Battle!
					</Link>
				</div>
			)
	}	
}

module.exports = Home;