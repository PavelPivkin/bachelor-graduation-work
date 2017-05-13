import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ObjectList from './object-list';
 
class DataController extends React.Component {
		constructor (props) {
		super(props);
		this.state =  {
			objects: countriesData,
			params: [],
			objectStack: [],
		}

		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
		this.handleObjectSelected = this.handleObjectSelected.bind(this);
		this.handleParameterSelected = this.handleParameterSelected.bind(this);
	}

	componentDidMount () {
		this.setState({
			params: this.getParams(this.state.objects)
		})
	}

	getChildren (parent) {
		if ("obj" in parent) {
			return parent.obj;
		} else {
			return undefined;
		}
	}

	getParams (objectList) {
		let set = new Set();
		objectList.forEach((obj) => {
			if ("p" in obj) {
				obj.p.forEach((param) => {
					set.add(param.name);
				});
			}
		});

		let array = [];
		set.forEach(v => array.push({name: v}));
		return array;
	}

	handleButtonClick (e) {
		let _object = this.state.objects.find((obj) => obj.name == e.target.id ? true : false);
		let _children = this.getChildren(_object);

		let _params = this.getParams(_children);

		let _stack = this.state.objectStack;
		_stack.push(this.state.objects);
		
		this.setState({
			objects: _children,
			params: _params,
			objectStack: _stack,
		});
		this.props.onNextButtonClicked(e);
	}

	handleObjectSelected (e) {
		this.props.onObjectSelected (e, this.state.objects);

	}

	handleParameterSelected (e) {
		this.props.onParameterSelected (e, this.state.objects);
	}

	handleBackButtonClick (e) {
		let _stack = this.state.objectStack;
		let _objects = _stack.pop();
		let _params = this.getParams(_objects);
		if (_objects != undefined) {
			this.setState({
				objects: _objects,
				params: _params,
				objectStack: _stack,
			});
		}
		this.props.onBackButtonClicked(e);
	}

	render() {	
		return ( 
			<div className='data-controller'>
				<div className="data-list data-objects">
					<button onClick={this.handleBackButtonClick}>назад</button>
					<h4>Объекты</h4>
					<ObjectList 
						objects={this.state.objects} 
						onItemButtonClick={this.handleButtonClick} 
						onItemSelected={this.handleObjectSelected}
					/>

				</div>

				<div className='data-list data-properties'>
				<h4>Параметры сравнения</h4>
					<ObjectList 
						objects={this.state.params} 
						onItemSelected={this.handleParameterSelected}
					/> 
				</div>
				
			</div>
		);
	}
}

export default DataController;