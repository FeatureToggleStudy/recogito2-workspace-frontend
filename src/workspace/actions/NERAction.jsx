import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import NERModal from '../../common/content/ner/NERModal.jsx';

export default class NERAction extends Component {

  startNER(config) {
    const documents = this.props.selection.filter(d => {
      const isDocument = d.type === 'DOCUMENT'
      const hasTextParts = d.filetypes.filter(t => t.startsWith('TEXT_')).length > 0;
      return isDocument && hasTextParts
    });

    const taskDefinition = Object.assign(
      { task_type: 'NER', documents: documents.map(d => d.id) }, 
      config
    );

    axios.post('/api/job', taskDefinition)
      .then(response => {
        console.log(response.data);
        this.props.onStarted();
      });
  }

  render() {
    return ReactDOM.createPortal(
      <NERModal 
         onStart={this.startNER.bind(this)}
         onCancel={this.props.onCancel} />, 
      document.body
    )
  }

}
