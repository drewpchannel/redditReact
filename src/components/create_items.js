import React from 'react';
import CommentButton from './comments_button';

const redditItemsList = (redditItems, redditListRef) => {
  let redditItemsComplete = redditItems.map((elem) => {
    let imageDefault = "http://images.clipartpanda.com/white-cloud-clipart-no-background-13270607091459405201simplecloud-bw.svg";
    let imageHeight = 300;
    let imageWidth = 300;
    const scaleImageHeight = (height, width) => {
      let newWidth = width/height * 300;
      return newWidth;
    }
    if (elem.data.preview) {
      const redditPost = elem.data.preview.images[0]
      if (redditPost.variants.gif) { 
        imageDefault = redditPost.variants.gif.source.url;
        // imageHeight = scaleImageHeight(redditPost.variants.gif.source.width, redditPost.variants.gif.source.height);
      } else {
        imageDefault = redditPost.source.url;
        // imageHeight = scaleImageHeight(redditPost.source.width, redditPost.source.height);
      }
    }
    let divSize = {
      width: 800
    }
    let date = new Date(elem.data.created).toString();
    return (
      <div key={elem.data.id + "div"} id={elem.data.id + "div"} style={divSize} className="redditItemBox" ref={elem.data.id} >
          <img key={elem.data.id + "img"} src={imageDefault} className="redditItemImage" />
          <div className="RedditPostDivs">
            <a key={elem.data.id} href={`https://www.reddit.com${elem.data.permalink}`} className="redditLinkText">{elem.data.title}</a>
            <br />
            <a href={`https://www.reddit.com/user/${elem.data.author}`} className='authorLink'>By: {elem.data.author}</a>
            <br />
            <a href={`https://www.reddit.com/r/${elem.data.subreddit}`} className="subRedditLinks">/r/{elem.data.subreddit}</a>
            <p className="datePosts">{date}</p>
            <CommentButton 
              currentRedditPost={elem} 
              commentsJSON={`https://www.reddit.com${elem.data.permalink}`} 
              redditListRef={redditListRef}
            />
          </div>
      </div>
    );
  });
  return redditItemsComplete;
};
export default redditItemsList;