import React, { Component } from 'react';
import jsStyle from './jsStyles/jsStyle'; 
import CommentButton from './comments_button'

class RedditList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      scrolls: 0
    }
  }
  componentDidMount () {
    const count = this;
    const countLimit = _.throttle(this.countScrolls, 1000);
    window.addEventListener('scroll', countLimit.bind(this));
  }
  countScrolls () {
    this.setState({scrolls: this.state.scrolls + 1});
    if (this.state.scrolls % 7 === 0) {
      this.props.loadMorePosts();
    }
  }
  render() {
    if (!this.props.redditDL.data) {
      return <div>Loading...</div>;
    }
    const redditItems = this.props.redditDL.data.children;
    const redditItemsList = redditItems.map((elem) => {
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
      let buttonStyle = {
        width: 80,
        height: 10,
        fontSize: 10,
        lineHeight: 0
      }
      function bTextChg (){
        if (document.getElementById(this.data.id + 'button').innerHTML === 'Comments') {
          document.getElementById(this.data.id + 'button').innerHTML = 'Close';
        } else {
          document.getElementById(this.data.id + 'button').innerHTML = 'Comments';
        }
      }
      return (
        <div key={elem.data.id + "div"} style={divSize} className="redditItemBox" >
            <img key={elem.data.id + "img"} src={imageDefault} style={imageStyle} className="redditItemImage" />
            <div style={linkSize}>
              <a key={elem.data.id} href={permaLinks}>{elem.data.title}</a>
              <br />
              <a href={`https://www.reddit.com/user/${elem.data.author}`}>By: {elem.data.author}</a>
              <br />
              <button style={buttonStyle} id={elem.data.id + "button"} onClick={bTextChg.bind(elem)}>Comments</button>
              <CommentButton />
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
}

export default RedditList;