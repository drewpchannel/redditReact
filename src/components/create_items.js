import React from 'react';
import CommentButton from './comments_button';

const redditItemsList = (redditItems, redditListRef) => {
  let redditItemsComplete = redditItems.map((elem) => {
    let imageDefault = "http://images.clipartpanda.com/white-cloud-clipart-no-background-13270607091459405201simplecloud-bw.svg";
    let externalLink;
    let imageHeight = 300;
    let imageWidth = 300;
    let elemID = elem.data.id + "img";
    let hoverPlayGif = () => {};
    let stopGif = () => {};
    if (elem.data.preview) {
      const redditPost = elem.data.preview.images[0];
      if (redditPost.variants.gif) { 
        imageDefault = elem.data.thumbnail;
        externalLink = redditPost.variants.gif.source.url;
        hoverPlayGif = () => {
          document.getElementById(elemID).src = redditPost.variants.gif.source.url;
        }
        stopGif = () => {
          document.getElementById(elemID).src = elem.data.thumbnail;
        }
      } else if (elem.data.post_hint === "hosted:video") {
        imageDefault = redditPost.source.url;
        externalLink = elem.data.url;
      } else {
        imageDefault = redditPost.source.url;
        externalLink = redditPost.source.url;
      }
    }
    let divSize = {
      width: 'auto'
    }
    let date = new Date(elem.data.created).toString();
    return (
      <div key={elem.data.id + "div"} id={elem.data.id + "div"} style={divSize} className="redditItemBox" ref={elem.data.id} >
            <a href={externalLink} target="_blank" className="itemImageLink">
              <img key={elemID} id={elemID} src={imageDefault} className="redditItemImage" onMouseOver={hoverPlayGif} onMouseLeave = {stopGif} />
            </a>
          <div className="RedditPostDivs">
            <a key={elem.data.id} href={`https://www.reddit.com${elem.data.permalink}`} target="_blank" className="redditLinkText">{elem.data.title}</a>
            <br />
            <a href={`https://www.reddit.com/user/${elem.data.author}`} target="_blank" className='authorLink'>By: {elem.data.author}</a>
            <br />
            <a href={`https://www.reddit.com/r/${elem.data.subreddit}`} target="_blank" className="subRedditLinks">/r/{elem.data.subreddit}</a>

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