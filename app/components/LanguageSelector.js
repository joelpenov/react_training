import React from "react"
import Api from "../services/Api"

import Loading from "./Loading"
import NumericFormat from "../formaters/NumericFormat"

var languageFilters = ["All", "Ruby", "Python", "Java", "JavaScript", "PHP", "CSS"];

function RepositoriesList (props){
		return (
				<ul className="popular-list">
					{ 
						props.repositories.map((repository, index) => {
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
												<li>{NumericFormat.SeparateByCommas(repository.stargazers_count)} stars</li>
											</ul>
										</li>
									)
						})
					}
					
				</ul>)
	}



class LanguageSelector extends React.Component{

		state = {
			selectedLanguage: languageFilters[0],
			repositories: null
		};

	setLanguage = (language) => {
		this.setState(() =>
			 	({
					selectedLanguage: language,
					repositories: null
				})
		);

		Api.getRepositories(language).then((repositories) => {
			this.setState(() => ({ repositories	}))
		})
	}

	componentDidMount = () => {
		this.setLanguage(this.state.selectedLanguage);
	}

	render(){
		return (
				<div>
					<ul className="filtersContainer">
						{languageFilters.map((filter) => {
							return (
									<li 
									onClick= {this.setLanguage.bind(null, filter)}
									style= {
											filter === this.state.selectedLanguage ? 
											{color: "#d0021b" } : 
											null
										}
									key={filter}>
										{filter}
									</li>
								)
						})}
					</ul>

				{ 
					this.state.repositories !== null ? 
					<RepositoriesList repositories={this.state.repositories} /> : 
					<Loading/>
				}

				</div>
			)
	}
}

export default LanguageSelector;