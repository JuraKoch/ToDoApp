import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
	constructor(){
		super();

		this.state = {
			term: ''
		}

		this.onSearchPanelChanged = (e) => {
			let term = e.target.value;
			this.setState({term});
			this.props.onSearchPanelChanged(term);
		};
	}

	render(){
		return (
		    <input
		    	type="text"
		        className="form-control search-input"
		        placeholder="type to search"
		        onChange={this.onSearchPanelChanged}
		        value={this.state.term}
		    />
		  );
	}
};
