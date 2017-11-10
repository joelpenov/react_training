import React from "react"
import PropTypes from "prop-types"

class Avatar extends React.Component{

	static propTypes = {
				username: PropTypes.string.isRequired,
				avatarUrl: PropTypes.string.isRequired
			}

	render() {
		return (
				<div className="column">
					<div>{this.props.label}</div>
					<img className="avatar" src={this.props.avatarUrl}/>
					<p>@{this.props.username}</p>
					{this.props.children}
				</div>
			)
	}
}

export default Avatar;