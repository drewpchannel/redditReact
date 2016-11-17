import React from 'react';
import ReactDom from 'react-dom';

const RedditList = (props) => {
  if (!props.redditDL.data) {
    return <div>Loading...</div>;
  }
  //more dynamic names are needed like a const for redditDL
  return (
    <div>
      <p>{props.redditDL.data.children[0].data.url}</p>
    </div>
  );
}

export default RedditList;