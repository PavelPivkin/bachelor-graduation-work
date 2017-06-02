import  React  from 'react';
import  { Nav, NavItem } from 'react-bootstrap';


const MenuHeaders = [

	"Текстовый отчет",
	"Графического отчет"
]

class Menu extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			activeKey: 0,
		};
	}
	
	handleOnSelect (eventKey) {
		this.setState({
			activeKey: eventKey
		});
		this.props.onSelect(eventKey);
	}

	render () {
		return (
			<div className="menu">
				<Nav className="menu-nav" bsStyle="pills" activeKey={this.state.activeKey} >
					{ 	
						MenuHeaders.map((header, index) => 
							<NavItem 
								eventKey={index} 
								key={index.toString()}
								onSelect={this.handleOnSelect.bind(this)} >
									{header}
							</NavItem> 
						)
					}
				</Nav>
			</div>
		);
	}
}

export default Menu;