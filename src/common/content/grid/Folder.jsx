import React, { Component } from 'react';

export default class Folder extends Component {

  render() {
    return (
      <div
        className={`cell${(this.props.selected) ? ' selected' : ''}`}
        onClick={this.props.onClick}>

        <div className="inner">
          <div className="item-wrapper">
            <a href="#" className="folder">
              <div className="label">
                {this.props.title}
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }

}
