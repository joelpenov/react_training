var React = require("react");
var PropTypes = require("prop-types");

class PlayerInput extends React.Component{
	
	constructor(props) {
		super(props);

		this.state = {
			username: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event){

		event.preventDefault();

		this.props.onSubmit(
			this.props.playerId, 
			this.state.username
			);
	}

	handleChange(event){
		var usernameValue = event.target.value;
		this.setState(function(){
			return {
				username: usernameValue
			}
		});
	}

	render() {
		var elementId = "username" + this.props.playerId;
		return (
				<form className="column" onSubmit={this.handleSubmit}>
					<label className="header" htmlFor={elementId}>
						{this.props.label}
					</label>
					<input
					id={elementId}
					placeholder="github username..."
					type="text"					
					value={this.state.username}
					onChange={this.handleChange}
					autoComplete= "off"	/>

					<button 
					type="submit"
					className="button"
					disabled={!this.state.username}>

					Submit
						
					</button>
				</form>
			)
	}
}

PlayerInput.propTypes = {
	label: PropTypes.string.isRequired,
	playerId: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}


class Battle extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			playerOneName: "",
			playerTwoName: "",
			playerOneImage: null,
			playerTwoImage: null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.getPlayerInputUI = this.getPlayerInputUI.bind(this);
	}

	handleSubmit(playerId, username){
		this.setState(function(){
			var newState = {};
			newState[playerId + "Name"] = username;
			newState[playerId + "Image"] = "https://github.com/" + username + ".png?size=200";
			return newState;
		});
	}

	getPlayerInputUI(userName){
		var playerName = "player" + userName;
		return (
				<PlayerInput
				  playerId= {playerName}
				  onSubmit= {this.handleSubmit}
				  label= {"Player " + userName}
				  />
			)
	}

	render() {
		var playerOne = this.state.playerOneName;
		var playerTwo = this.state.playerTwoName;
		return (
				<div className="row">
					{!playerOne && this.getPlayerInputUI("One")}
					{!playerTwo && this.getPlayerInputUI("Two")}
				</div>
			)
	}	
}

module.exports = Battle;