import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import API from './API.js';
import Modal from '../common/components/Modal.jsx';

export default class BasePopupForm extends Component {

  handleOk = () => {
    // TODO confirm via API
    API.confirmAnnouncement().then(() => {
      this.props.onClose();
    });
  }

  render() {
    return (
      <Modal 
        title="Message" 
        className="announcement"
        onClose={this.props.onClose}>

        <div className="content">
          <ReactMarkdown source={this.props.message} />
        </div>

        <button
          className="btn "
          onClick={this.handleOk}>Got it</button>
      </Modal>
    )
  }

}