import React, { Component } from 'react';

import DocumentsPane from './documents/DocumentsPane.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import TopBar from './top/TopBar.jsx';

import '../public/style/index.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <TopBar />
        <Sidebar />
        <DocumentsPane />
      </div>
    );
  }
}
