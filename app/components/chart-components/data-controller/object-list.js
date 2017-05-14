import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

class ObjectList extends React.Component {
		constructor (props) {
		super(props);
		this.state =  {
			objectList: [],
		}
	}

	getChildren (parent) {
		if ("obj" in parent) {
			return parent.obj;
		} else {
			return undefined;
		}
	}

	hasChildren (parent) {
		if (parent.obj != undefined) {
			return true;
		} else {
			return false;
		}
	}

	render() {		
		return ( 
				<div className="panel panel-default data-objects">
				  	<div className="panel-heading">Объекты</div>
				  	<div className="panel-body panel_height__inherit">
				  		<Button bsStyle="primary" onClick={this.props.onBackButtonClick}>назад</Button>
						<ListGroup className="data-list">
							{ this.props.objects.map((obj, index) => 
								<ListGroupItem  active={this.props.selectedObjects.includes(obj.name)} key={index.toString()} href='#' >
									<input id={obj.name} onChange={this.props.onItemSelected}  type="checkbox"/><label>{ obj.name }</label>
									{ 	
										this.hasChildren(obj) && 	
										<button 
											id={obj.name} 
											className="button-to-child" 
											onClick={this.props.onItemButtonClick}> 
											открыть 
										</button> 
									}	
								</ListGroupItem>
							)}
						</ListGroup>
				  	</div>
				</div>		
		);
	}
}

export default ObjectList;