import React from "react"
import QueryString from "query-string"

import BattleApi from "../services/BattleApi"
import ResultDetail from "./ResultDetail"
import Avatar from "./Avatar"
import Loading from "./Loading"
import PropTypes from "prop-types"

class Result extends React.Component {

		static propTypes={
			error: PropTypes.string,
			isLoading: PropTypes.bool,
			winner: PropTypes.object, 
			loser: PropTypes.object 
		}
		state = {
			error: "",
			isLoading: true,
			winner: null,
			loser: null
		}

	componentDidMount = () => {
		const {playerOneName, playerTwoName} = QueryString.parse(this.props.location.search);
		BattleApi.getBattleResult([playerOneName, playerTwoName])
			.then((response) => {

				const newState = {
					isLoading: false
				};

				if (response === null) {
					newState.error = "There were an error. Make sure both users exist on GitHub.";
				} else {
					const [winner, loser] = response;
					newState.winner = winner,
						newState.loser = loser
				}

				this.setState(() => {
					return newState;
				});
			});
	}

	render() {

		const {
			isLoading,
			error,
			winner,
			loser
		} = this.state;

		return ( <div className = "row"> 
			{
				isLoading === true &&
				( <Loading/> )
			} 
			{
				error && (<div className="error"> {this.state.error} </div>)
			} 
			{
				(winner !== null) &&
				( <Avatar avatarUrl = {winner.profile.avatar_url}
					username = {winner.profile.login}
					label = "Winner" >
					<ResultDetail profile = {winner.profile}/> 
				 </Avatar>
				)
			} 
			{
				(loser !== null) &&
				( <Avatar avatarUrl = {
						loser.profile.avatar_url
					}
					username = {
						loser.profile.login
					}
					label = "Loser">
					<ResultDetail profile = {
						loser.profile
					}/> </Avatar>
				)
			}

			</div>

		)
	}
}


export default Result;