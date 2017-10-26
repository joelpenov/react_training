var React = require("react");

var languageFilters = ["All", "Ruby", "Python", "Java", "JavaScript", "C#", "CSS"];

class LanguageSelector extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			selectedLanguage: languageFilters[0]
		};

		this.setLanguage = this.setLanguage.bind(this);
	}

	setLanguage(language){
		this.setState(function(){
			return  {
				selectedLanguage: language
			}
		});
	}

	render(){
		return (
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
			);
	}
}

module.exports = LanguageSelector;