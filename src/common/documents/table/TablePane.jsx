import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import Dropzone from 'react-dropzone'

import { Columns } from './Columns';
import FiledropHint from '../FiledropHint';
// import Readme from '../Readme.jsx';
import HeaderRow from './rows/HeaderRow';
import DocumentRow from './rows/DocumentRow';
import FolderRow from './rows/FolderRow';
import PreferencesModal from  './preferences/PreferencesModal';

export default class TablePane extends Component {

  state = {
    tablePreferencesOpen: false,
  }

  /** 
   * Handle click/SHIFT+click/CTRL+click selection via Selection helper class 
   * 
   * TODO is this identical to the select code in GridPane?
   */
  onClick(evt, item, idx) {
    const isShift = evt.getModifierState("Shift");
    const isCtrl = evt.getModifierState("Control");
    
    // Is this a selection or deselection?
    const isSelectAction = this.props.selection && 
      (isShift || isCtrl || !this.props.selection.includes(item));

    if (isSelectAction) {
      if (isShift)
        this.state.selection.selectRange(idx);
      else
        this.state.selection.selectItem(item, isCtrl);

      this.props.onSelect(this.state.selection.getSelectedItems());
      evt.preventDefault();
    }
  }

  rowRenderer() {
    return ((args) => {
      const item = this.props.items[args.index];
      const selected = this.props.selection.includes(item);

      return (item.type === 'FOLDER') ?
        <FolderRow 
          key={args.key} 
          style={args.style} 
          item={item} 
          selected={selected}
          onClick={e => this.onClick(e, item, args.index)} 
          onRename={this.props.onRenameFolder} /> :

        <DocumentRow
          key={args.key}
          style={args.style}
          columns={this.props.config.columns}
          item={item}
          selected={selected}
          onClick={e => this.onClick(e, item, args.index)} />
    });
  }

  showPreferences(visible) {
    this.setState({ prefsOpen: visible });
  }

  onSavePreferences(columns) {
    this.setState({ prefsOpen: false });
    this.props.onChangeColumnPrefs(columns);
  }

  sortBy(field) {
    const asc = this.props.sorting ?
      this.props.sorting.by === field ? !this.props.sorting.asc : true :
      true;

    this.props.onSort({ by: field, asc: asc });
  }

  onDrag(active) {
    this.setState({ drag: active });
  }

  onDrop(files, _, evt) {
    const url = evt.dataTransfer.getData('URL');

    const hostname = url ? (() => {
      const a = document.createElement('a');
      a.href = url;
      return a.hostname;
    })() : null;

    this.setState({ drag: false });

    if (files.length > 0)
      this.props.onDropFiles(files);
    else if (url && hostname !== window.location.hostname) // Require external link
      this.props.onDropURL(url);
  }

  render() {
    /*
    const readme = React.Children.toArray(this.props.children)
      .filter(c => c.type === Readme)
      .shift(); // First readme or undefined
    */

    const tablePane =
      <div className="documents-pane table-pane">
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="virtualized-list"
              width={width}
              height={height}
              rowCount={this.props.items.length}
              rowHeight={47}
              rowRenderer={this.rowRenderer()} />
          )}
        </AutoSizer>

        { this.state.drag && <FiledropHint /> }
        { this.props.busy && <div className="busy-mask" /> }
      </div>

    return (
      <React.Fragment>
        {/* readme */}

        <div className="documents-table-header">
          <HeaderRow 
            columns={this.props.config.columns} 
            onSort={this.sortBy.bind(this)}
            sortColumn={this.props.sorting ? this.props.sorting.by : null} 
            sortAsc={this.props.sorting ? this.props.sorting.asc : null} />

          <button
            className="column-options-btn nostyle icon"
            onClick={this.showPreferences.bind(this, true)} >&#xf141;</button>
        </div>

        {this.props.disableFiledrop ? tablePane :
          <Dropzone
            className="dropzone"
            disableClick={true}
            onDragEnter={this.onDrag.bind(this, true)}
            onDragLeave={this.onDrag.bind(this, false)}
            onDrop={this.onDrop.bind(this)}>
            
            {tablePane}
            
          </Dropzone>
        }

        { this.state.prefsOpen &&
          <PreferencesModal
            columns={this.props.columns}
            onCancel={this.showPreferences.bind(this, false)} 
            onSave={this.onSavePreferences.bind(this)} />
        }
      </React.Fragment>
    )
  }

}
