import React from 'react';
import MainPage from './main-page';
import Network from './network';
import Report from './report';
import Chart from './chart-components/chart';
import { PageHeader, Panel } from 'react-bootstrap';

class Content extends React.Component {
	constructor (props) {
		super(props);
	}

	render() {
		return (
			<div className='main'>

			  	    <Panel header="Нормативно справочная информация (ВПО)">
				      	{ this.props.activeKey == 0 && <MainPage /> }
					  	{ this.props.activeKey == 1 && <Network /> }
					  	{ this.props.activeKey == 2 && <Report /> }
					  	{ this.props.activeKey == 3 && <Chart /> }
				    </Panel>
		  	</div>
		);
	}
}

export default Content;
