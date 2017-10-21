var React = require("react");
var ReactDom = require("react-dom");
var PropTypes = require("prop-types");
require("./style.css");

var user = {
	name: "Fulano de Tal",
	username: "fdetal",
	img:"https://www.biografiasyvidas.com/biografia/p/fotos/platon.jpg"
};

//
class ComponentName extends React.Component{
	render(){
		return(
			<div className="mainContainer">
				<img  src={this.props.img} />
				<h1>Name: {this.props.name}</h1>
				<h5>Age: {this.props.age}</h5>
				<h5>Username: {this.props.username}</h5>
			</div>
		);
	}
}

ComponentName.propTypes = {
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	age: PropTypes.number.isRequired
};

ReactDom.render(
	<ComponentName name= {user.name}
				   username= {user.username}
				   age= {95}
				   img= {user.img} />
	, document.getElementById("app"));