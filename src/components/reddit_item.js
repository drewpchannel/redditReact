import React, { Component } from 'react';
import jsStyle from './jsStyles/jsStyle'; 
import redditItemsList from './create_items';

class RedditList extends Component {
  constructor (props) {
    super(props);
    this.scrolls = 0;
  }
  componentDidMount () {
    const count = this;
    const countLimit = _.throttle(this.countScrolls, 1000);
    window.addEventListener('scroll', countLimit.bind(this));
  }
  countScrolls () {
    this.scrolls++;
    if (this.scrolls % 7 === 0) {
      console.log('time to load more posts')
      this.props.loadMorePosts();
    }
  }
  render() {
    if (!this.props.redditDL.data) {
      return <div>Loading...</div>;
    }
    const redditItems = this.props.redditDL.data.children;
    let redditList = redditItemsList(redditItems);
    console.log(redditList)
    return (
      <div>
        {redditList}
      </div>
    );
  }
}

export default RedditList;