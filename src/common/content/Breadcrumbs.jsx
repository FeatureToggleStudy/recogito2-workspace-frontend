import React, { Component } from 'react';

const VIEW_LABELS = {
  MY_DOCUMENTS: 'My Documents',
  SHARED_WITH_ME: 'Shared with me'
}

export default class Breadcrumbs extends Component {

  render() {
    const title = this.props.view ? VIEW_LABELS[this.props.view] : this.props.label;

    return (
      <div className="breadcrumbs">
        <h2>{title} {this.props.count !== null &&
          <span className="count">{`(${this.props.count})`}</span>
        }
        </h2>
      </div>
    )
  }

}
