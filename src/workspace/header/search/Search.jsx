import React, { Component } from 'react';
import axios from 'axios';

import AdvancedSearch from './AdvancedSearch.jsx';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { advancedSearchOpen: false }
  }

  toggleAdvancedSearch() {
    this.setState(prev => (
      { advancedSearchOpen: !prev.advancedSearchOpen }
    ));
  }

  search = (evt) => {
    /*
    const query = evt.target.value;
    if (query.length > 1) {
      axios.post(`/api/search/all?q=${query}`, this.props.displayConfig).then(result => {
        this.props.onResponse(result.data);
      });
    }
    */
  }

  render() {
    return (
      <div className="wrapper">
        <div className="search">
          <div className="wrapper">
            <input
              placeholder="Search Recogito..."
              onChange={this.search} />
            <button
              className="icon nostyle advanced"
            onClick={this.toggleAdvancedSearch.bind(this)}>{'\ue688'}</button>
          </div>
          <span className="icon hand-lens">&#xf002;</span>
        </div>
        {this.state.advancedSearchOpen &&
          <AdvancedSearch onClose={this.toggleAdvancedSearch.bind(this)}/>
        }
      </div>
    )
  }

}
