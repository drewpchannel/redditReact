import React from 'react';
import ReactDom from 'react-dom';

const RedditList = (props) => {
  if (!props.redditDL.data) {
    return <div>Loading...</div>;
  }
  //needs user input for these fields once tested
  const redditItems = props.redditDL.data.children;
  const redditItemsList = redditItems.map((elem) => {
    console.log(elem.data)
    let imageDefault = "http://images.clipartpanda.com/white-cloud-clipart-no-background-13270607091459405201simplecloud-bw.svg";
    if (elem.data.preview !== undefined) {
      imageDefault = elem.data.preview.images[0].source.url;
    }
    let imageStyle = {
      height: 300,
      width: 300
    }
    return (
      <div>
        <img src={imageDefault} style={imageStyle} />
        <a key={elem.data.id} href="{elem.data.url}">{elem.data.title}</a>
      </div>
    );
  });
  return (
    <div>
      {redditItemsList}
    </div>
  );
}

export default RedditList;