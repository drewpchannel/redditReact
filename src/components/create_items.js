import React from 'react';
import CommentButton from './comments_button';

const redditItemsList = (redditItems, redditListRef) => {
  let redditItemsComplete = redditItems.map((elem) => {
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
    let imageStyle = {
      height: imageHeight,
      width: imageWidth,
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
    function boxSizeChanger (){
      const redditItemref = redditListRef.refs[elem.data.id];
      if (!redditItemref.originalHeight) {
        redditItemref.originalHeight = redditItemref.style.height;
      }
      if (redditItemref.style.height === redditItemref.originalHeight) {
        redditItemref.style.height = '700px';
      } else {
        redditItemref.style.height = redditItemref.originalHeight;
      }
    }
    return (
      <div key={elem.data.id + "div"} id={elem.data.id + "div"} style={divSize} className="redditItemBox" ref={elem.data.id} >
          <img key={elem.data.id + "img"} src={imageDefault} style={imageStyle} className="redditItemImage" />
          <div style={linkSize}>
            <a key={elem.data.id} href={permaLinks}>{elem.data.title}</a>
            <br />
            <a href={`https://www.reddit.com/user/${elem.data.author}`}>By: {elem.data.author}</a>
            <br />
            <CommentButton 
              currentRedditPost={elem} 
              commentsJSON={permaLinks} 
            />
            <button onClick={boxSizeChanger}>bigger box</button>
          </div>
      </div>
    );
  });
  return redditItemsComplete;
};
export default redditItemsList;