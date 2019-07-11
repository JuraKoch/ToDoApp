import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  constructor(){
    super();

    this.buttons = [
      {name: 'all', label: 'All'},
      {name: 'active', label: 'Active'},
      {name: 'done', label: 'Done'},
    ];
  }

  render() {
    let buttons = this.buttons.map(({name, label}) => {
      let btnClass = (this.props.filter === name) ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button 
          type="button"
          className={`btn ${btnClass}`}
          key={name}
          onClick={() => this.props.onFilterChange(name)}
        >
          {label}
        </button>
      );
    })
    return (
      <div  className="btn-group">
        {buttons}
      </div>
    );
  }
}
