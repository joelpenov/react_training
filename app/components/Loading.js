import React from "react"
import PropTypes from "prop-types"

class Loading extends React.Component{

	state = {
		label: this.props.text,
		speed: 0
	};

	static propTypes = {
		speed: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired
	}

	static defaultProps = {
		text: "Loading",
		speed: 300
	}

	componentDidMount = () => {
		const expectedFinalText = `${this.props.text}...`;
		this.interval = window.setInterval(() => {

			let newText = (expectedFinalText === this.state.label) ?
							this.props.text : this.state.label += ".";

			this.setState(() => ({label: newText}))

		}, this.props.speed);
	}

	componentWillUnmount = () => {
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

export default Loading;