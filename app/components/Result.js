var React = require("react");
var QueryString = require("query-string");

var BattleApi = require("../services/BattleApi");
var ResultDetail = require("./ResultDetail");
var Avatar = require("./Avatar");
var Loading = require("./Loading");

class Result extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			error: "",
			isLoading: true,
			winner:null,
			loser:null
		}
	}

	componentDidMount(){
		var queryStringObject = QueryString.parse(this.props.location.search);
		BattleApi.getBattleResult([queryStringObject.playerOneName, queryStringObject.playerTwoName])
		.then(function(response){

				var newState = {
					isLoading: false
				};

				if(response === null){
					newState.error = "There were an error. Make sure both users exist on GitHub.";
				}else{
					newState.winner = response[0],
					newState.loser = response[1]
				}

			this.setState(function(){
				return newState;
			});
		}.bind(this));
	}

	render(){		

			var isLoading = this.state.isLoading;
			var error = this.state.error;
			var winner = this.state.winner;
			var loser = this.state.loser;

			return (
					<div className="row">
						{ isLoading === true &&
									(
										<Loading/>
									)
						}
						{ error &&
									(
										<div className="error">
											{this.state.error}
										</div>
									)
						}
						{ (winner !== null ) &&
									(
										<Avatar
											avatarUrl={winner.profile.avatar_url}
											username={winner.profile.login}
											label="Winner"
										 >
											<ResultDetail profile={winner.profile} />
										</Avatar>
									)
						 }
						 {
						 	(loser !== null) &&
									(
										<Avatar
											avatarUrl={loser.profile.avatar_url}
											username={loser.profile.login}
											label="Loser"
										 >
											<ResultDetail profile={loser.profile} />
										</Avatar>
									)
						 }

					</div>
				
				)
	}
}


module.exports = Result;