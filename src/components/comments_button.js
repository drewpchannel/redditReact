import React, { Component } from 'react';
import ReactDom from 'react-dom';

class CommentButton extends Component {
  constructor (props) {
    super (props);
    this.state = {
      commentBody: '',
    }
    this.currentRedditPost = this.props.currentRedditPost.data;
  }
  buttonTextChg (){
    console.log(this)
    if (document.getElementById(this.currentRedditPost.id + 'button').innerHTML === 'Comments') {
      document.getElementById(this.currentRedditPost.id + 'button').innerHTML = 'Close';
      this.loadRedditComments ();
    } else {
      document.getElementById(this.currentRedditPost.id + 'button').innerHTML = 'Comments';
      this.setState({commentBody: ''});
    }
  }
  loadRedditComments () {
    const xhr = new XMLHttpRequest();
    xhr.onload = (data) => {
      if (xhr.readyState === 4) {
        const x = JSON.parse(xhr.responseText);
        this.setState({commentBody: x[1].data.children[0].data.body});
      }
    }
    xhr.open("GET", `${this.props.commentsJSON}.json`);
    xhr.send();
  }
  render () {
    //style={buttonStyle} id={this.props.data.id + "button"} onClick={bTextChg.bind(this.props)}
    let buttonStyle = {
      width: 80,
      height: 10,
      fontSize: 10,
      lineHeight: 0
    }
    //add author text somewhere
    //need to adjust for additional pages
    //make comment body an unsorted or sorted list?
    return (
      <div>
        <button style={buttonStyle} id={this.currentRedditPost.id + "button"} onClick={this.buttonTextChg.bind(this)}>Comments</button>
        <p>{this.state.commentBody}</p>
      </div>
    )
  }
}
export default CommentButton; 