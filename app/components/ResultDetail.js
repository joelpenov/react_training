import React from "react"

class ResultDetail extends React.Component{
	render(){
		var profile = this.props.profile;
		
		return (
				<ul className="result-detail">
					{ profile.name && <li>{profile.name}</li> }
					{ profile.location && <li>{profile.location}</li> }
					{ profile.company && <li>{profile.company}</li> }
					<li>Followers: {profile.followers}</li>
					<li>Following: {profile.following}</li>
					<li>Public Repositories: {profile.public_repos}</li>
					{ profile.blog && <li><a href={profile.blog}>{profile.blog}</a></li> }

				</ul>
			)
	}
};

export default ResultDetail;