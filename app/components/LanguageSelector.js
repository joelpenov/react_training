var React = require("react");
var Api = require("../services/Api");

var Loading = require("./Loading");

var languageFilters = ["All", "Ruby", "Python", "Java", "JavaScript", "PHP", "CSS"];

function numericFormat(number){
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function RepositoriesList (props){
		return (
				<ul className="popular-list">
					{ 
						props.repositories.map(function(repository, index){
						
								return (
										<li key={repository.name} className="popular-item">
											<div className="popular-rank">#{index + 1}</div>
											<ul className="space-list-items">
												<li>
													<img className="avatar" src={repository.owner.avatar_url}
														alt={"Avatar for " + repository.owner.login} />
														
												</li>
												<li><a target="_blank" href={repository.html_url}>{repository.name}</a></li>
												<li>@{repository.owner.login}</li>
												<li>{numericFormat(repository.stargazers_count)} stars</li>
											</ul>
										</li>
									)
						
						})
					}
					
				</ul>
			)			
	}



class LanguageSelector extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			selectedLanguage: languageFilters[0],
			repositories: null
		};

		this.setLanguage = this.setLanguage.bind(this);
	}

	setLanguage(language){
		var self = this;
		self.setState(function(){
			return  {
				selectedLanguage: language,
				repositories: null
			}
		});

		Api.getRepositories(language).then(function(respositories){
			self.setState(function(){
				return  {
					repositories: respositories
				}
			})
		})
	}

	componentDidMount() {
		this.setLanguage(this.state.selectedLanguage);
	}

	render(){
		return (
				<div>
					<ul className="filtersContainer">
						{languageFilters.map(function(filter){
							return (
									<li 
									onClick= {this.setLanguage.bind(null, filter)}
									style= {filter === this.state.selectedLanguage ? {color: "#d0021b" } : null}
									key={filter}>
										{filter}
									</li>
								)
						}, this)}
					</ul>

				{this.state.repositories !== null ? <RepositoriesList repositories={this.state.repositories} /> : <Loading/>}

				</div>
			)
	}
}

module.exports = LanguageSelector;