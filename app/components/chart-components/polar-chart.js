import React from 'react';
import {Radar} from "react-chartjs-2";
import DataController from "./data-controller/data-controller";
import { randomColor } from "randomcolor";

class RadarChart extends React.Component {
	constructor (props) {
		super(props);
        this.state = {
            objects: [],
            labels: [],
            selectedParameters: [],
        }
        this.handleObjectSelected = this.handleObjectSelected.bind(this);
        this.handleParameterSelected = this.handleParameterSelected.bind(this);
        this.handleNextButtonClicked = this.handleNextButtonClicked.bind(this);
        this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
	}

    handleObjectSelected (e, _objects) {
        let _labels = this.state.labels;
        if (_labels.includes(e.target.id)) {
            _labels = _labels.filter((label) => label === e.target.id ? false : true);
        } else {
            _labels.push (e.target.id);
        }
        this.setState({
            labels: _labels,
            objects: _objects
        });
    }

    handleParameterSelected(e, _objects) {
        let _selectedParams = this.state.selectedParameters;
        if (_selectedParams.includes(e.target.id)) {
            _selectedParams = _selectedParams.filter((param) => param === e.target.id ? false : true);
        } else {
            _selectedParams.push(e.target.id);            
        }
        this.setState({
            selectedParameters: _selectedParams,
            objects: _objects
        });
    }

    handleBackButtonClicked(e) {
        this.setState({
            labels: [],
            selectedParams: []
        })
    }

    handleNextButtonClicked(e) {
        this.setState({
            labels: [],
            selectedParams: []
        })
    }

    makeData() {
        let _datasets = [];
        let _selectedParameters = this.state.selectedParameters;
        let _labels = this.state.labels;
        let _objects = this.state.objects;
        _selectedParameters.forEach(function(selectedParam, i) { 
            let _data = [];
            _labels.forEach(function(label, j) {
                let obj = _objects.find((obj) => obj.name == label ? true : false);
                if (obj != undefined && 'p' in obj) {
                    let param = obj.p.find((param) => param.name == selectedParam ? true : false);
                    if(param == undefined) {
                            param = {value: undefined};
                        }
                    _data.push(param.value);
                }
            });
            let _backgroundColor = randomColor({ format: 'rgba', alpha: 0.2 });
            let _borderColor = _backgroundColor.replace("0.2", "1")
            _datasets.push({
                label: selectedParam,
                backgroundColor: _backgroundColor,
                borderColor: _borderColor,
                pointBackgroundColor: _borderColor,
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: _borderColor,
                data: _data
            })            
        });

        let data = {
            labels: _labels,
            datasets: _datasets
        }
        return data;
    }

    setDataColor () {
        
    }

	render() {
		return <div>
                    <DataController 
                        onObjectSelected={this.handleObjectSelected} 
                        onParameterSelected={this.handleParameterSelected}
                        onBackButtonClicked={this.handleBackButtonClicked}
                        onNextButtonClicked={this.handleNextButtonClicked}
                        selectedObjects={this.state.labels}
                        selectedParameters={this.state.selectedParameters}
                        numericParametersOnly={true}
                    />
                    <Radar data={this.makeData()} />
                </div> 
	}
}

export default RadarChart;
