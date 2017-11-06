var React = require("react");
var PropTypes = require("prop-types");
var Link = require("react-router-dom").Link;

var Avatar = require("./Avatar");

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
			this.props.playerNumber, 
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
		var elementId = "username" + this.props.playerNumber;
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
	playerNumber: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

class PlayerInputUI extends React.Component{
	render() {
		var playerName = "player" + this.props.playerNumber;
		return (
			<PlayerInput
			  playerNumber= {this.props.playerNumber}
			  onSubmit= {this.props.handleSubmit}
			  label= {"Player " + this.props.playerNumber}
			  />
		)
	}
}

PlayerInputUI.propTypes={
	playerNumber: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired
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
		this.setNewState = this.setNewState.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	setNewState(username, avatarUrl, playerId){
		this.setState(function(){
			var newState = {};
			newState["player" + playerId + "Name"] = username;
			newState["player" + playerId + "Image"] = avatarUrl;
			return newState;
		});
	}

	handleSubmit(playerId, username){
		var avatarUrl="https:\//github.com/" + username + ".png?size=200";
		this.setNewState(username, avatarUrl, playerId);		
	}

	handleReset(playerId){
		this.setNewState("", null, playerId);
	}

	render() {
		var match = this.props.match;

		var playerNumberOne = "One";
		var playerNumberTwo = "Two";
		return (
				<div>
					<div className="row">

					{!this.state.playerOneName &&
						<PlayerInputUI					 
							playerNumber={playerNumberOne}
							handleSubmit={this.handleSubmit}
						/>
					}
					{this.state.playerOneName && 
						<Avatar
							avatarUrl={this.state.playerOneImage} 
							username={this.state.playerOneName}							
						>							
							<a className="reset-anchor" 
								href="#"
								onClick={this.handleReset.bind(null, playerNumberOne)}
								>
								Reset
							</a>
						</Avatar>
					}
					{!this.state.playerTwoName && 
						<PlayerInputUI
							playerNumber={playerNumberTwo}
							handleSubmit={this.handleSubmit}
						/>
					}
					{this.state.playerTwoName && 
						<Avatar
							avatarUrl={this.state.playerTwoImage} 
							username={this.state.playerTwoName}
						>							
							<a className="reset-anchor" 
								href="#"
								onClick={this.handleReset.bind(null, playerNumberTwo)}
								>
								Reset
							</a>
						</Avatar>
					}
					
				</div>
				<div className="row">
					{
						(this.state.playerTwoName && this.state.playerOneName) &&
						<Link
						className="button"					
						to={
							{
								pathname: match.url + "/results",
								search: `?playerOneName=${this.state.playerOneName}&`+
										 `playerTwoName=${this.state.playerTwoName}`
							}
						}

						>
							Battle!
						</Link>
					}
				</div>
				</div>
			)
	}	
}

module.exports = Battle;