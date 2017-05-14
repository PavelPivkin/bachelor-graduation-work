import React from 'react';
import { Table } from 'react-bootstrap';


class DataTable extends React.Component {
	constructor (props) {
		super(props);
	}

	render() {
		return (
		  	<div className = "data-table">
		  		  <Table striped bordered condensed hover>
				    <thead>
				      <tr>
				        <th>Свойство/Объекты</th>
				        {
				        	this.props.data.labels.map((label) =>
				        		<th>{label}</th>
				        	)
				        }
				      </tr>
				    </thead>
				    <tbody>
				      {
				      	this.props.data.datasets.map((dataset) =>
				      		<tr> 
				      			<td>{dataset.label}</td>
				      			{dataset.data.map((data) => 
				      				<td>{data}</td>
				      			)}
				      		</tr>
				      	)
				      }
				    </tbody>
				  </Table>
		  	</div>
		);
	}
}

export default DataTable;
