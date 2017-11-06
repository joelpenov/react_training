var React = require("react");
var PropTypes = require("prop-types");

class Loading extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			label: this.props.text,
			speed: 0
		};
	}

	componentDidMount(){
		var expectedFinalText = `${this.props.text}...`;
		this.interval = window.setInterval(function(){

			var newText = (expectedFinalText === this.state.label) ?
							this.props.text : this.state.label += ".";

			this.setState(function(){
					return {
						label: newText
					}
				});

		}.bind(this), this.props.speed);
	}

	componentWillUnmount(){
		window.clearInterval(this.interval);
	}

	render(){
		return(
				<p className="loader">
					{this.state.label}
				</p>
			)		
	}
}

Loading.propTypes = {
	speed: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired
}

Loading.defaultProps = {
	text: "Loading",
	speed: 300
}

module.exports = Loading;