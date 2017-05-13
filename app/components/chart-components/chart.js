import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import ColumnChart from './column-chart';
import PieChart from './pie-chart';
import RadarChart from './polar-chart';


class Chart extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			activeKey: 0,
		};
		this.handleSelect = this.handleSelect.bind(this);

	}

	handleSelect (eventKey, event) {
		this.setState({
			activeKey: eventKey,
		});
	}
	
	render() {
		return (
		  	      <div>
		  	      	
		  	      	<div className="chart">	
				        <Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={this.handleSelect}>
				          <NavItem eventKey={0} title="Построение столбчатой диаграммы модели">Столбчатая диаграмма</NavItem>
				          <NavItem eventKey={1} title="Построение радарной диаграммы модели">Радарная диаграмма</NavItem>
				          <NavItem eventKey={2} title="Построение круговой диаграммы модели">Круговая диаграмма</NavItem>
				        </Nav>
				        {this.state.activeKey == 0 && <ColumnChart />}
				        {this.state.activeKey == 1 && <RadarChart />}
				        {this.state.activeKey == 2 && <PieChart />}
			        </div>
			      </div>
		  	
		);
	}
}

export default Chart;
