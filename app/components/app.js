import React from 'react';
import Menu from './menu';
import Content from './content';

class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			activeKey: 0
		};
	}

	handleMenuItemSelect (activeKey) {
		this.setState({
			activeKey: activeKey
		})
	}

	render() {
		return (
			<div>
			  	<Menu onSelect={this.handleMenuItemSelect.bind(this)} />
			  	<Content activeKey={this.state.activeKey} />
			 </div>
		);
	}
}

export default App;
