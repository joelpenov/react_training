var Axios = require("axios");

var Api = {
	getRepositories: function(languageFilter){
		languageFilter = languageFilter || "All";
		var url = window.encodeURI("https://api.github.com/search/repositories?q=stars:>1+language:" +
				   `${languageFilter}&sort=starts&order=desc&type=Repositories`);		
	 	return Axios.get(url).then(function(response){
			return response.data.items;
		});
	}
}

module.exports = Api;