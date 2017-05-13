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
		let obj = objects.find((obj) => obj.name == e.target.id ? true : false);
		if (obj != undefined) {
			this.state.labels.push(obj.name);
			
			if ("p" in obj && this.state.selectedParameter != undefined) {
					let param = obj.p.find((param) => param.name == this.state.selectedParameter ? true : false);
					this.state.data.push(param.value);						
			}	
		}
		this.setState({});
		
		
	}

	handleParameterSelected(e, objects) {
		let _data = []
		this.state.labels.forEach(function(objName, index) {
			let obj = objects.find((obj) => obj.name == objName ? true : false);
			if ("p" in obj ) {
					let param = obj.p.find((param) => param.name == e.target.id ? true : false);
					_data.push(param.value);
						
			}
		});
		this.setState({
			data:_data,
			selectedParameter: e.target.id
		})
	}

	handleBackButtonClicked(e) {
		this.setState({
			data: [],
			labels: [],
		})
	}

	handleNextButtonClicked(e) {
		this.setState({
			data: [],
			labels: [],
		})
	}

	makeData() {
		let data = {
			    labels: this.state.labels,
			    datasets: [
			        {
			            label: this.state.selectedParameter,
			            backgroundColor: this.state.backgroundColor,
			            borderColor: this.state.borderColor,
			            borderWidth: 1,
			            data: this.state.data,
			        }
			    ]
			}
		return data;
	}

	setDataColor() {
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

	render() {
		this.setDataColor();
		return <div>
					<DataController 
						onObjectSelected={this.handleObjectSelected} 
						onParameterSelected={this.handleParameterSelected}
						onBackButtonClicked={this.handleBackButtonClicked}
						onNextButtonClicked={this.handleNextButtonClicked}
					/>
					<Bar data={this.makeData()} />
				</div> 

	}
}

export default ColumnChart;

