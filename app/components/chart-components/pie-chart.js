import React from 'react';
import {Pie} from 'react-chartjs';

var chartData = {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
};

class PieChart extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
			<Pie data={chartData} />
		);
	}
}

export default PieChart;
