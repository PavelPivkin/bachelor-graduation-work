import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class ParameterList extends React.Component {
		constructor (props) {
		super(props);
	}

	isActive(parameterName) {
		return this.props.selectedParameters.includes(parameterName);
	}

	render() {	
		return ( 
				<div className="panel panel-default data-properties">
				  	<div className="panel-heading">Критерии</div>
				  	<div className="panel-body panel_height__inherit">
						<ListGroup className="data-list">
							{ 
								this.props.parameters.map((obj, index) => 
									<ListGroupItem 
										active={this.props.selectedParameters.includes(obj.name)} 
										key={index.toString()}  
										href='#' 
										onClick={this.props.onItemSelected} 
										id={obj.name}>
										{obj.name}
									</ListGroupItem>
								)
							}
						</ListGroup>
				  	</div>
				</div>	
		);
	}
}

export default ParameterList;