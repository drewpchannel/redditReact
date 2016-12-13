import React from 'react';
import ReactDom from 'react-dom';

const RedditList = (props) => {
  if (!props.redditDL.data) {
    return <div>Loading...</div>;
  }
  const redditItems = props.redditDL.data.children;
  let postCount = 0;
  const redditItemsList = redditItems.map((elem) => {
    postCount++;
    if (postCount === 25) {
      console.log(elem)
    }
    let imageDefault = "http://images.clipartpanda.com/white-cloud-clipart-no-background-13270607091459405201simplecloud-bw.svg";
    let imageHeight = 300;
    let imageWidth = 300;
    let permaLinks = `https://www.reddit.com${elem.data.permalink}`;
    const scaleImageHeight = (height, width) => {
      let newWidth = width/height * 300;
      return newWidth;
    }
    if (elem.data.preview) {
      const redditPost = elem.data.preview.images[0]
      if (redditPost.variants.gif) { 
        imageDefault = redditPost.variants.gif.source.url;
        imageHeight = scaleImageHeight(redditPost.variants.gif.source.width, redditPost.variants.gif.source.height);
      } else {
        imageDefault = redditPost.source.url;
        imageHeight = scaleImageHeight(redditPost.source.width, redditPost.source.height);
      }
    }
    //needs user input for these fields once tested
    let imageStyle = {
      height: imageHeight,
      width: imageWidth,
      display: "inline-block"
    }
    //might need better word wrapping
    let divSize = {
      height: imageHeight + 6,
      width: 800
    }
    let linkSize = {
      width: 794 - imageWidth,
      display: "inline-block"
    }
    return (
      <div key={elem.data.id + "div"} style={divSize} className="redditItemBox">
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