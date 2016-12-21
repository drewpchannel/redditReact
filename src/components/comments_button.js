import React, { Component } from 'react';
import ReactDom from 'react-dom';

const CommentButton = (elem) => {
  let commentBody = '';
  const currentRedditPost = elem.currentRedditPost.data
  //style={buttonStyle} id={elem.data.id + "button"} onClick={bTextChg.bind(elem)}
  function buttonTextChg (){
    console.log(elem.commentsJSON)
    if (document.getElementById(currentRedditPost.id + 'button').innerHTML === 'Comments') {
      document.getElementById(currentRedditPost.id + 'button').innerHTML = 'Close';
      loadRedditComments ();
    } else {
      document.getElementById(currentRedditPost.id + 'button').innerHTML = 'Comments';
    }
  }
  let buttonStyle = {
    width: 80,
    height: 10,
    fontSize: 10,
    lineHeight: 0
  }
  //add author text somewhere
  //need to adjust for additional pages
  function loadRedditComments () {
    const xhr = new XMLHttpRequest();
    xhr.onload = (data) => {
      if (xhr.readyState === 4) {
        const x = JSON.parse(xhr.responseText);
        commentBody = x[1].data.children[0].data.body
      }
    }
    xhr.open("GET", `${elem.commentsJSON}.json`);
    xhr.send();
  }
  return (
    <div>
      <button style={buttonStyle} id={currentRedditPost.id + "button"} onClick={buttonTextChg.bind(elem)}>Comments</button>
      <p>{commentBody}</p>
    </div>
  )
}
export default CommentButton; 