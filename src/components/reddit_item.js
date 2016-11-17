import React from 'react';
import ReactDom from 'react-dom';

const RedditList = (props) => {
  if (!props.redditDL.data) {
    return <div>Loading...</div>;
  }
  //needs user input for these fields once tested
  const redditItems = props.redditDL.data.children;
  const redditItemsList = redditItems.map((elem) => {
    console.log(elem)
    return <a key={elem.data.id} href="{elem.data.url}">{elem.data.title}</a>
  })
  return (
    <div>
      {redditItemsList}
    </div>
  );
}

export default RedditList;