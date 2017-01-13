import React, { Component } from 'react';
import ReactDom from 'react-dom';
import parseLinks from '../functions/parseLinks';

class CommentButton extends Component {
  constructor (props) {
    super (props);
    this.state = {
      commentBody: '',
    }
    this.currentRedditPost = this.props.currentRedditPost.data;
  }
  buttonTextChg (){
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
        const redditCommentsJSON = JSON.parse(xhr.responseText);
        this.setState({commentBody: this.createCommentsArray(redditCommentsJSON)});
      }
    }
    xhr.open("GET", `${this.props.commentsJSON}.json`);
    xhr.send();
  }
  createCommentsArray (redditCommentsJSON) {
    let newCommentsArray = [];
    if (redditCommentsJSON[0].data.children[0].data.selftext !== "") {
      newCommentsArray.push(
          <span key={this.currentRedditPost.id + "comments" + x}>
            <p className='authorComment'>
            {redditCommentsJSON[0].data.children[0].data.author}:
            </p>
            <p className='authorCommentBody'>
              {parseLinks(redditCommentsJSON[0].data.children[0].data.selftext, this.currentRedditPost.id + "commentsInd")}
            </p>
          </span>
      );
    }
    for (var x = 0; x < 5; x++) {
      if (redditCommentsJSON[1].data.children[x]){
        newCommentsArray.push(
          <span key={this.currentRedditPost.id + "comments" + x}>
            <p className='authorComment'>
            {redditCommentsJSON[1].data.children[x].data.author}:
            </p>
            {parseLinks(redditCommentsJSON[1].data.children[x].data.body, this.currentRedditPost.id + "commentsInd")}
          </span>
        );
      }
    }
    return newCommentsArray;
  }
  render () {
    let buttonStyle = {
      width: 80,
      height: 10,
      fontSize: 10,
      lineHeight: 0
    }
    return (
      <div>
        <button style={buttonStyle} id={this.currentRedditPost.id + "button"} onClick={this.buttonTextChg.bind(this)}>Comments</button>
        <div>{this.state.commentBody}</div>
      </div>
    )
  }
}
export default CommentButton; 