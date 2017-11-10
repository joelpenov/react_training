import React from "react"
import {NavLink} from "react-router-dom"

var menuItems = [{
	text: "Battle",
	path: "/battle"
}, {
	text: "Popular",
	path: "/popular"
}, ]

const GetNavBarItem = ({
	text,
	path
}) => ( < li >
	< NavLink activeClassName = "active"
	to = {
		path
	} > {
		text
	} < /NavLink> < /li>
)

class NavBar extends React.Component {
	render() {
		return ( < ul className = "nav-bar" >
			< li >
			< NavLink exact activeClassName = "active"
			to = "/" >
			Home < /NavLink> < /li> {
				menuItems.map((item) => {
						return ( < GetNavBarItem text = {
								item.text
							}
							path = {
								item.path
							}
							key = {
								item.text
							}
							/>)
						})
				} < /ul>
			)
		}
	}


export default NavBar;