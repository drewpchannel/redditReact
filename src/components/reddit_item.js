import React from 'react';
import ReactDom from 'react-dom';

const RedditList = (props) => {
  if (!props.redditDL.data) {
    return <div>Loading...</div>;
  }
  const redditItems = props.redditDL.data.children;
  const redditItemsList = redditItems.map((elem) => {
    // console.log(elem.data)
    let imageDefault = "http://images.clipartpanda.com/white-cloud-clipart-no-background-13270607091459405201simplecloud-bw.svg";
    let permaLinks = `https://www.reddit.com${elem.data.permalink}`;
/*    if (shorterTitle.length > 50) {
      shorterTitle = shorterTitle.slice(0, 60) + "...";
    }*/
    if (elem.data.preview !== undefined) {
      imageDefault = elem.data.preview.images[0].source.url;
    }
    //needs user input for these fields once tested
    let imageStyle = {
      height: 300,
      width: 300,
      display: "inline-block"
    }
    //might need better word wrapping
    let divSize = {
      height: 300,
      width: 800
    }
    let linkSize = {
      width:400,
      display: "inline-block"
    }
    return (
      <div key={elem.data.id + "div"} style={divSize}>
          <img key={elem.data.id + "img"} src={imageDefault} style={imageStyle} />
          <div style={linkSize}>
            <a key={elem.data.id} href={permaLinks}>{elem.data.title}</a>
          </div>
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