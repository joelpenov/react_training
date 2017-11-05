var Settings = require("../config/Settings");
var Axios = require("axios");

var baseGithubUrl = "https://api.github.com"
var githubParams = `?client_id=${Settings.GitHubTokenKey}&client_secret=${Settings.GitHubTokenSecret}`;

var getUserProfile = function(username){
	return Axios.get(`${baseGithubUrl}/users/${username}${githubParams}`)
	.then(function(response){
		return response.Data;
	})
}

var getUserProfile = function(username){
	return Axios.get(`${baseGithubUrl}/users/${username}${githubParams}`)
	.then(function(response){
		return response.data;
	})
}

var getUserRepositories = function(username){
	return Axios.get(`${baseGithubUrl}/users/${username}/repos${githubParams}`)
	.then(function(response){
		return response.data;
	})
}

var countRepositoryStars = function(repositories){
	return repositories.reduce(function(counter, currentRepository){
		return counter + currentRepository.stargazers_count;
	}, 0);
}

var calculateScore = function(profile, repositories){
	return (profile.followers * 3) + countRepositoryStars(repositories);
}

var getUserData = function(username){
	var requestPromises = [getUserProfile(username), getUserRepositories(username)];
		return Axios.all(requestPromises).then(function(responses){
			var profile = responses[0];
			var score = calculateScore(profile, responses[1]);
			return {
				profile: profile,
				score:score
			}
		});
}

var sortUsersByScore = function(userDataCollection){
	return userDataCollection.sort(function(a,b){
		return b.score - a.score;
	});
}

var BattleApi = {
	getBattleResult: function(usernames){
		var userDataCollectionPromises = usernames.map(getUserData);
		var userDataCollection = [];
		return Promise.all(userDataCollectionPromises).then(function(responses){
			responses.forEach(function(userData){
				userDataCollection.push(userData);
			});

			return sortUsersByScore(userDataCollection);
		});
	}
}

module.exports = BattleApi;