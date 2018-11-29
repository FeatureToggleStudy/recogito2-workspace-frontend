import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import ContentEditable from "react-sane-contenteditable";

export default class Readme extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      editing: false,
      content: this.props.content
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      content: props.content
    });
  }

  onEdit() {
    this.setState({ editing: true });
  }

  onDelete() {
    this.props.onDelete && this.props.onDelete();
  }

  onChange(evt, value) {
    this.setState({ content: value });
  }

  onSave() {
    this.props.onUpdate && this.props.onUpdate(this.state.content);
    this.setState({ editing: false });
  }

  onCancel() {
    this.setState({
      editing: false,
      content: this.props.content
    })
  }

  renderView() {
    return (
      <div className="readme">
        <div className="wrapper">
          <div className="textbox">
            <ReactMarkdown source={this.state.content} />       
          </div>

          <span className="buttons modify">
            <button
              className="icon nostyle"
              title="Delete"
              onClick={this.onDelete.bind(this)}>&#xf05e;</button>  

            <button
              className="icon nostyle"
              title="Edit"
              onClick={this.onEdit.bind(this)}>&#xf040;</button>
          </span>
        </div>
      </div>
    )
  }

  renderEdit() {
    return (
      <div className="readme editing">
        <div className="wrapper">
          <ContentEditable 
            tagName="div"
            className="textbox"
            content={this.state.content} 
            editable={true} 
            multiLine={true}
            onChange={this.onChange.bind(this)}/>            

          <div className="editbar">
            <span className="hint">Supports <a href="#">Markdown</a></span>
            <span className="buttons">
              <button 
                className="icon nostyle"
                onClick={this.onSave.bind(this)}>&#xf00c;</button>

              <button 
                className="icon nostyle"
                onClick={this.onCancel.bind(this)}>&#xf00d;</button>
            </span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.state.editing ? this.renderEdit() : this.renderView();
  }

}
