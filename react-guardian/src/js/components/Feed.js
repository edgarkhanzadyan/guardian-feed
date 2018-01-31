import React, { Component } from 'react';

import Post from './Post';
import PinnedPost from './PinnedPost';
// css
import '../../css/Feed.css';
// utils
import { getFeed } from '../utils/Requests';
import { createValidNewsArray, spawnNotification } from '../utils/Utility';

const Feed = class extends Component {
  componentDidMount() {
    Notification.requestPermission(); // request permission for sending notifications to the browser
    const { windowYScrollValue } = this.props;
    window.scrollTo(0, windowYScrollValue);
    window.addEventListener('scroll', this.onScroll, false);
    // initial fetch
    if (!this.props.news.length) {
      this.fetchDataFromGuardian({ pageIndex: 1 });
    }
    // fetch news every 30 seconds
    setInterval(
      this.refreshTop,
      30 * 1000,
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const { newsAreRefreshing, toggleRefreshing, news } = this.props;
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200) &&
			!newsAreRefreshing
    ) {
      // fetch when scroll gets to the end of the page
      const pageToFetch = Math.floor(news.length / 10) + 1;

      this.fetchDataFromGuardian({ pageIndex: pageToFetch });
      toggleRefreshing(true);
    }
  }

  refreshTop = async () => {
    const { updateNewsFromAbove, toggleRefreshing, news } = this.props;
    const fetchedData = await getFeed({ pageIndex: 1 });
    const jsonedData = await fetchedData.json();
    const newsArray = createValidNewsArray(jsonedData.response.results);
    // spawn notification if there are any new posts
    const first10news = news.slice(0, 10);
    const filteredArray = newsArray.filter(newPost =>
      !first10news.some(post => newPost.id === post.id));
    if (filteredArray.length) {
      spawnNotification(filteredArray[0].title);
    }
    updateNewsFromAbove(newsArray);
    toggleRefreshing(false);
  }

  fetchDataFromGuardian = async (pageFetchingOptions) => {
    // fetching data from Guardian
    const { updateNewsFromBelow, toggleRefreshing } = this.props;
    const fetchedData = await getFeed(pageFetchingOptions);
    const jsonedData = await fetchedData.json();
    const newsArray = createValidNewsArray(jsonedData.response.results);
    updateNewsFromBelow(newsArray);
    toggleRefreshing(false);
  }

  togglePinPost = (toggledPost) => {
    const { togglePinnedPostInNews, removePinnedPost, addPinnedPost } = this.props;
    if (toggledPost.pinned) {
      removePinnedPost(toggledPost);
    } else {
      addPinnedPost(toggledPost);
    }
    togglePinnedPostInNews(toggledPost);
  }

  render() {
    const {
      match,
      news,
      pinnedPosts,
      setWindowYScroll,
    } = this.props;
    const onPostLinkClick = () =>
      setWindowYScroll(window.scrollY);

    // create a vertical scrollist of news
    const newsUI = news.map(post => (
      <Post
        key={post.uuid}
        post={post}
        onPostLinkClick={onPostLinkClick}
        match={match}
        togglePinPost={this.togglePinPost}
      />
    ));

    // create a horizontal scrollist of pinned news
    const pinnedPostsUI = pinnedPosts.map(post => (
      <PinnedPost
        key={post.uuid}
        post={post}
        onPostLinkClick={onPostLinkClick}
        match={match}
      />
    ));

    return (
      <div className='Feed'>
        {
          !pinnedPosts.length ? null :
            <div>
              <p>pinned:</p>
              <div className='allPinnedPostContainer'>
                {pinnedPostsUI}
              </div>
            </div>
        }
        {newsUI}
      </div>
    );
  }
};

export default Feed;
