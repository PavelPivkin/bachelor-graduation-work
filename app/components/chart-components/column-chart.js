import React from 'react';
import { Bar } from "react-chartjs";
import DataController from "./data-controller/data-controller";
import { randomColor } from "randomcolor";

class ColumnChart extends React.Component {
	constructor (props) {
		super(props);
		this.state =  {
			labels:[],
			data:[],
			dataMap: new Map(),
			backgroundColor: [],
			borderColor: [],
			selectedParameter:  undefined,
		}
		this.handleObjectSelected = this.handleObjectSelected.bind(this);
		this.handleParameterSelected = this.handleParameterSelected.bind(this);
		this.handleNextButtonClicked = this.handleNextButtonClicked.bind(this);
		this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
	}

	handleObjectSelected (e, objects) {
		if (this.state.dataMap.has(e.target.id)) {
			this.state.dataMap.delete(e.target.id);
		} else {
			let obj = objects.find((obj) => obj.name == e.target.id ? true : false);
			if (obj != undefined) {
				this.state.dataMap.set(obj.name, undefined);
				if ("p" in obj && this.state.selectedParameter !== undefined) {
						let param = obj.p.find((param) => param.name == this.state.selectedParameter ? true : false);
						this.state.dataMap.set(obj.name, param.value);
				}	
			}	
		}
		this.setState({});
	}

	handleParameterSelected(e, objects) {
		let _dataMap = new Map();
		if (this.state.selectedParameter == undefined || this.state.selectedParameter != e.target.id) {
			this.state.dataMap.forEach(function(paramValue, objName) {
				let obj = objects.find((obj) => obj.name == objName ? true : false);
				if ("p" in obj ) {
						let param = obj.p.find((param) => param.name == e.target.id ? true : false);
						_dataMap.set(objName, param.value);
				}
			});
						
			this.setState({
				selectedParameter: e.target.id,
				dataMap: _dataMap
			})

		} else {
			this.state.dataMap.forEach(function (paramValue, objName) {
				_dataMap.set(objName, undefined);
			})
			this.setState({
				selectedParameter: undefined,
				dataMap: _dataMap
			})
		}

	}

	handleBackButtonClicked(e) {
		this.setState({
			dataMap: new Map()
		})
	}

	handleNextButtonClicked(e) {
		this.setState({
			dataMap: new Map()
		})
	}

	makeData() {
		let _labels = [];
		let _data = [];
		this.state.dataMap.forEach(function(paramValue, objName) {
			_labels.push(objName);
			_data.push(paramValue);
		})
		let data = {
			    labels: _labels,
			    datasets: [
			        {
			            label: this.state.selectedParameter,
			            backgroundColor: this.state.backgroundColor,
			            borderColor: this.state.borderColor,
			            borderWidth: 1,
			            data: _data,
			        }
			    ]
			}
		return data;
	}

	setDataColor () {
		let _backgroundColor = [];
		for (let i = 0; i < this.state.labels.length; i++) {
			_backgroundColor.push(randomColor({format: 'rgba', alpha: 0.2}));
			this.state.backgroundColor = _backgroundColor;
		}
		let _borderColor = this.state.backgroundColor.map((obj) => 
			obj.replace("0.2", "1")
		)
		this.state.borderColor = _borderColor;
	}

	getSelectedObjects () {
		let _labels = [];
		this.state.dataMap.forEach(function(paramValue, objName) {
			_labels.push(objName);
		})
		return _labels;
	}

	render() {
		this.setDataColor();
		return <div>
					<DataController 
						onObjectSelected={this.handleObjectSelected} 
						onParameterSelected={this.handleParameterSelected}
						onBackButtonClicked={this.handleBackButtonClicked}
						onNextButtonClicked={this.handleNextButtonClicked}
						selectedObjects={this.getSelectedObjects()}
						selectedParameters={[this.state.selectedParameter]}
					/>
					<Bar data={this.makeData()} />
				</div> 

	}
}

export default ColumnChart;

