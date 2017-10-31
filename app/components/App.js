var React = require("react");
var ReactRouter = require("react-router-dom");
var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var NavBar = require("./NavBar");
var Home = require("./Home");
var Battle = require("./Battle");
var LanguageSelector = require("./LanguageSelector");

class App extends React.Component{
	render(){
		return (
				<BrowserRouter>
					<div className="container"> 
						<NavBar/>
						<Switch>
							<Route exact path="/" component={Home} />						
							<Route path="/popular" component={LanguageSelector} />
							<Route path="/battle" component={Battle} />
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

module.exports = App;