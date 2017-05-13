import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class ObjectList extends React.Component {
		constructor (props) {
		super(props);
		this.state =  {
			objectList: [],
		}
	}

	
	componentWillReceiveProps (nextProps) {
		this.setState ({
			objectList: this.makeList(nextProps.objects)
		})
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

	makeList (objectList) {
		let Items = objectList.map((obj, index) => 
			<ListGroupItem active={this.props.activeMap.has(obj.name)} key={index.toString()} onClick={this.handleItemSelected} href='#' >
				<div onClick={this.props.onItemSelected} id={obj.name}>{ obj.name }</div>
				{ 	
					this.hasChildren(obj) && 	
					<button 
						id={obj.name} 
						className="button-to-child" 
						onClick={this.props.onItemButtonClick}> > 
					</button> 
				}
			</ListGroupItem>
		);
		return Items;
	}

	render() {		
		return ( 					
				<ListGroup>
					{ this.state.objectList }
				</ListGroup>
		);
	}
}

export default ObjectList;