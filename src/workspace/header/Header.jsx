import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import Search from './search/Search.jsx';
import HeaderIcon from './HeaderIcon.jsx';
import Breadcrumbs from './subheader/Breadcrumbs.jsx';
import DeleteAction from '../actions/DeleteAction.jsx';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action: null 
    };

    document.body.addEventListener('keydown', this.onKeydown.bind(this), false);
  }

  onKeydown(evt) {
     // DELETE
    if (this.props.selection.length > 0 && evt.which == 46)
      this.setState({ action: 'DELETE' });
  }

  /** User clicked the DELETE button in the mini-menu */
  startDeleteAction() {
    this.setState({ action: 'DELETE' });
  }

  /** User clicked CANCEL in the warning prompt **/
  cancelDelete() {
    this.setState({ action: null });
  }

  /** Delete executed successfully **/
  onDeleteSuccess() {
    this.setState({ action: null }, () => {
      this.props.afterDelete();
    });
  }

  onDeleteError(error) {
    // TODO error message
    this.setState({ action: null }, () => {
      this.props.afterDelete();
    });
  }

  render() {
    const isOpen = this.props.selection.length > 0;
    return (
      <div className="header">
        <div className="top-row">
          <Search/>
          <div className="header-icons">
            <HeaderIcon icon="&#xe64a;" className="help stroke7" link="/help" />
            {/* <HeaderIcon icon="&#xe8ae;" className="stats" />
            <HeaderIcon icon="&#xe8c1;" className="notifications" /> */}
          </div>
        </div>
        <div className="subheader">
          <Breadcrumbs view={this.props.view}/>

          <div className="subheader-icons">
            <CSSTransition
              in={isOpen} 
              timeout={500} 
              classNames="selection-actions">

              <div className="selection-actions">              
                {/* <span className="share icon">&#xf234;</span> */}

                <span
                  className="delete icon" 
                  onClick={this.startDeleteAction.bind(this)}>&#xf014;</span>

                {/* <span className="more icon">&#xf078;</span> */}
              </div>
            </CSSTransition>

            <HeaderIcon
              className="presentation-toggle stroke7"
              icon={(this.props.presentation == 'TABLE') ? '\ue645' : '\ue636'} 
              onClick={this.props.onTogglePresentation} />

            {this.state.action == 'DELETE' && 
                <DeleteAction
                  selection={this.props.selection}
                  onStart={this.props.onDelete}
                  onSuccess={this.onDeleteSuccess.bind(this)}
                  onError={this.onDeleteError.bind(this)}
                  onCancel={this.cancelDelete.bind(this)} />
            }
          </div>
        </div>
      </div>
    )
  }

}
