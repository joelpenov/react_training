var React = require("react");
var NavLink = require("react-router-dom").NavLink;

var menuItems = [
				{
					text: "Battle",
					path: "/battle"
				},
				{
					text: "Popular",
					path: "/popular"
				},
			]

function GetNavBarItem(props){
	return (
			<li>
				<NavLink activeClassName="active" to={props.path}>
					{props.text}
				</NavLink>
			</li>
		)
}

class NavBar extends React.Component{
	render(){
		return (
				<ul className="nav-bar">
					<li>
						<NavLink exact activeClassName="active" to="/">
							Home
						</NavLink>
					</li>
					{menuItems.map(function(item){
						return (<GetNavBarItem text={item.text} path={item.path} key={item.text} />)
					})}
				</ul>
			)
	}
}


module.exports = NavBar;