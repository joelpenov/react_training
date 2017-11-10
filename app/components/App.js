import React from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"

import NavBar from "./NavBar"
import Home from "./Home"
import Battle from "./Battle"
import LanguageSelector from "./LanguageSelector"
import Result from "./Result"

class App extends React.Component{
	render(){
		return (
				<BrowserRouter>
					<div className="container"> 
						<NavBar/>
						<Switch>
							<Route exact path="/" component={Home} />						
							<Route path="/popular" component={LanguageSelector} />
							<Route exact path="/battle" component={Battle} />
							<Route path="/battle/results" component={Result} />
							<Route render={
								function(){
									return (<h1>Not found!</h1>)
								}
							} />
						</Switch>
					</div>
				</BrowserRouter>				
			)
	}
}

export default App;