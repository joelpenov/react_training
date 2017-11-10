import React from "react"
import {Link} from "react-router-dom"
import Battle from "./Battle"

class Home extends React.Component{
	render() {
		return (
				<div className="home-container">
					<h1>Github battle: battle your friends and win!</h1>
					<Link className="button-animated button" to="/battle">
						Battle!
					</Link>
				</div>
			)
	}	
}

export default Home;