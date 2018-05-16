import React, { Component } from 'react';
import jsStyle from './jsStyles/jsStyle'; 
import redditItemsList from './create_items';

class RedditList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let height = Math.max (document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    window.onscroll = () => {
      if (height - document.documentElement.scrollTop < 0) {
        height = Math.max (document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
        this.props.loadMorePosts();
      }
    }
  }
  render() {
    if (!this.props.redditDL.data) {
      return <div>Loading...</div>;
    }
    const redditItems = this.props.redditDL.data.children;
    let redditList = redditItemsList(redditItems, this);
    return (
      <div>
        {redditList}
      </div>
    );
  }
}

export default RedditList;