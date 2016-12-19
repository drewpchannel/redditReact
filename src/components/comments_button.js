import React, { Component } from 'react';
import ReactDom from 'react-dom';

const CommentButton = () => {
  console.log('i try to load this')
  //style={buttonStyle} id={elem.data.id + "button"} onClick={bTextChg.bind(elem)}
  function bTextChg (){
    if (document.getElementById(this.data.id + 'button').innerHTML === 'Comments') {
      document.getElementById(this.data.id + 'button').innerHTML = 'Close';
    } else {
      document.getElementById(this.data.id + 'button').innerHTML = 'Comments';
    }
  }
  return (
    <p>something for replacing comment button, bring in dataid through params</p>
  )
}
export default CommentButton; 