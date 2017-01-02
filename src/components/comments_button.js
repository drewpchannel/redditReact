import React, { Component } from 'react';
import ReactDom from 'react-dom';

class CommentButton extends Component {
  //check what loading comments reloads on the site
  constructor (props) {
    super (props);
    this.state = {
      commentBody: '',
    }
    this.currentRedditPost = this.props.currentRedditPost.data;
  }
  //switch to refs or data or state?
  //not a huge fan of the callback setup in this file
  buttonTextChg (){
    if (document.getElementById(this.currentRedditPost.id + 'button').innerHTML === 'Comments') {
      document.getElementById(this.currentRedditPost.id + 'button').innerHTML = 'Close';
      this.loadRedditComments ();
    } else {
      document.getElementById(this.currentRedditPost.id + 'button').innerHTML = 'Comments';
      this.setState({commentBody: ''});
    }
    this.buttonSizeChanger();
  }
  loadRedditComments () {
    const xhr = new XMLHttpRequest();
    xhr.onload = (data) => {
      if (xhr.readyState === 4) {
        const x = JSON.parse(xhr.responseText);
        this.setState({commentBody: this.createCommentsArray(x)});
      }
    }
    xhr.open("GET", `${this.props.commentsJSON}.json`);
    xhr.send();
  }
  createCommentsArray (redditCommentsJSON) {
    let newCommentsArray = [];
    if (redditCommentsJSON[0].data.children[0].data.selftext !== "") {
      newCommentsArray.push(
          <p key={this.currentRedditPost.id + "comments"}>
            OP: {redditCommentsJSON[0].data.children[0].data.selftext}
          </p>
      );
    }
    for (var x = 0; x < 5; x++) {
      if (redditCommentsJSON[1].data.children[x]){
        newCommentsArray.push(
            <p key={this.currentRedditPost.id + "comments" + x}>
              {redditCommentsJSON[1].data.children[x].data.author}: {redditCommentsJSON[1].data.children[x].data.body}
            </p>
        );
      }
    }
    return newCommentsArray;
  }
  buttonSizeChanger () {
    const redditItemref = this.props.redditListRef.refs[this.currentRedditPost.id];
    if (!redditItemref.originalHeight) {
      // redditItemref.originalHeight = redditItemref.style.height;
    }
    if (redditItemref.style.height === redditItemref.originalHeight) {
      // redditItemref.style.height = '700px';
    } else {
      // redditItemref.style.height = redditItemref.originalHeight;
    }
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
        <div>{this.state.commentBody}</div>
      </div>
    )
  }
}
export default CommentButton; 