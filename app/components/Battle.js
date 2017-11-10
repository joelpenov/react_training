import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"

import Avatar from "./Avatar"

class PlayerInput extends React.Component{

	static propTypes = {
			label: PropTypes.string.isRequired,
			playerNumber: PropTypes.string.isRequired,
			onSubmit: PropTypes.func.isRequired
		}

		state = {
			username: ""
		};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit(
			this.props.playerNumber, 
			this.state.username
			);
	}

	handleChange = (event) => {
		var usernameValue = event.target.value;
		this.setState(() => ({username: usernameValue}));
	}

	render() {
		var elementId =`username${this.props.playerNumber}`;
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

class PlayerInputUI extends React.Component{
	static propTypes={
			playerNumber: PropTypes.string.isRequired,
			handleSubmit: PropTypes.func.isRequired
		}
	render() {
		return (
			<PlayerInput
			  playerNumber= {this.props.playerNumber}
			  onSubmit= {this.props.handleSubmit}
			  label= {"Player " + this.props.playerNumber}
			  />
		)
	}
}

class Battle extends React.Component{

	state = {
		playerOneName: "",
		playerTwoName: "",
		playerOneImage: null,
		playerTwoImage: null
	}

	setNewState = (username, avatarUrl, playerId) => {
		this.setState(() =>({
			["player" + playerId + "Name"]: username,
			["player" + playerId + "Image"]: avatarUrl
		}));
	}

	handleSubmit = (playerId, username) => {
		const avatarUrl=`https:\//github.com/${username}.png?size=200`;
		this.setNewState(username, avatarUrl, playerId);		
	}

	handleReset = (playerId) => {
		this.setNewState("", null, playerId);
	}

	render() {
		const {match} = this.props;
		const playerNumberOne = "One";
		const playerNumberTwo = "Two";
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

export default Battle;