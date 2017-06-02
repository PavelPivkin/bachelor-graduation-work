import React from 'react';
import {Pie} from 'react-chartjs-2';
import DataController from "./data-controller/data-controller";
import { randomColor } from "randomcolor";

class PieChart extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			dataMap: new Map(),
		};
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
                        if(param == undefined) {
                            param = {value: undefined};
                        }
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
                        if(param == undefined) {
                            param = {value: undefined};
                        }
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
        let _backgroundColor = this.getBackgroundColor();
        let data = {
                labels: _labels,
                datasets: [
                    {
                        data: _data,
                        backgroundColor: _backgroundColor,
                        hoverBackgroundColor: _backgroundColor
                    }]
        };
        return data;
    }

    getBackgroundColor() {
        let _backgroundColor = randomColor({luminosity:'dark', format: 'rgba', alpha: 0.2, count: this.state.dataMap.size});
        return _backgroundColor;
    }

    getSelectedObjects () {
        let _labels = [];
        this.state.dataMap.forEach(function(paramValue, objName) {
            _labels.push(objName);
        })
        return _labels;
    }


	render() {
		return (
            <div>
                <DataController 
                    onObjectSelected={this.handleObjectSelected} 
                    onParameterSelected={this.handleParameterSelected}
                    onBackButtonClicked={this.handleBackButtonClicked}
                    onNextButtonClicked={this.handleNextButtonClicked}
                    selectedObjects={this.getSelectedObjects()}
                    selectedParameters={[this.state.selectedParameter]}
                    numericParametersOnly={true}
                />
			     <Pie data={this.makeData()} />
            </div>
		);
	}
}

export default PieChart;
