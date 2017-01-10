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
  findCommentLinks (commentText) {
    const regexSearch = /(\bhttp|(http))\w+/gi;
    let linkTextFound = regexSearch.exec(commentText)
    let newLink =[];
    let currentLetter = 0;
    let commentWithLinks = '';
    let originalLetter = 0;
    //if for links first thing in post or only
    const findWholeURL = () => {
      let endOfText = currentLetter;
      while ((commentText.charAt(currentLetter) !== '') && (commentText.charAt(currentLetter) !== ' ')) {
        newLink.push(commentText.charAt(currentLetter))
        currentLetter = currentLetter + 1;
      }
      newLink = newLink.join('');
      console.log(newLink)
      let newLinkJSX = <a href={newLink}>Link</a>;
      commentWithLinks = <p className='authorCommentBody'>{commentText.substring(originalLetter, endOfText)}<a href={newLink}>Link</a>{commentText.substring((currentLetter + newLink.length), commentText.length)}</p>
    }
    // while ()
    if(linkTextFound) {
      currentLetter = linkTextFound.index;
      findWholeURL();
    } else {
      return <p className='authorCommentBody'>{commentText}</p>;
    }
    //add on hover to tell url?
    return commentWithLinks;
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
              {redditCommentsJSON[0].data.children[0].data.selftext}
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
            {this.findCommentLinks(redditCommentsJSON[1].data.children[x].data.body)}
          </span>
        );
      }
    }
    return newCommentsArray;
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