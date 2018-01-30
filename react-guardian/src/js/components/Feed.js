import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// css
import '../../css/Feed.css';
// utils
import { getFeed } from '../utils/Requests';
import {
	spawnNotification,
	createValidNewsArray
} from '../utils/Utility';
import { updatePinnedPosts, addPinnedPost } from '../actions/index';

const PostLink = ({children, postId, matchUrl}) => (
	<Link to={`${matchUrl}post?id=${postId}`}>
		{children}
	</Link>
);

const Feed = class extends Component {

  state = {
		news: [],
		isRefreshing: false,
		pinnedPosts: []
  }
  
	componentDidMount() {
		Notification.requestPermission(); // request permission for sending notifications to the browser
		
    window.addEventListener('scroll', this.onScrollEnd, false);
    // initial fetch
    const { news } = this.state;
    const pageToFetch = Math.floor(news.length / 10) + 1;
		this.fetchDataFromGuardian({ pageIndex: pageToFetch });
		// fetch news every 30 seconds
		// setInterval(
		// 	this.refreshTop,
		// 	 30 * 1000
		// );
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollEnd, false);
	}
	
	onScrollEnd = () => {
		if (
			(window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200) &&
			!this.props.newsAreRefreshing
    ) {
      const { toggleRefreshing, news } = this.props;
      // fetch when scroll gets to the end of the page
      const pageToFetch = Math.floor(news.length / 10) + 1;

      this.fetchDataFromGuardian({ pageIndex: pageToFetch });
      toggleRefreshing(true);
			// this.setState({isRefreshing: true});
    }
	}

	refreshTop = async () => {
    const { updateNewsFromAbove, toggleRefreshing } = this.props;
		const fetchedData = await getFeed({ pageIndex: 1 });
		const jsonedData = await fetchedData.json();
    const newsArray = createValidNewsArray(jsonedData.response.results);
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

	togglePinPost = toggledPost => {
    const { pinnedPosts, removePinnedPost, addPinnedPost } = this.props;
    if (toggledPost.pinned) {
      toggledPost.pinned = false;
      removePinnedPost(toggledPost);
    } else {
      toggledPost.pinned = true;
      addPinnedPost(toggledPost);
    }
	}

  render() {
    const { match, news, pinnedPosts } = this.props;
		const newsUI = news.map(post => (
			<div className="postContainer" key={post.uuid}>
				<PostLink matchUrl={match.url} postId={post.id}>
					<p className="postTitle">{post.title}</p>
				</PostLink>
				<p className="postCategory">{post.category}</p>
				<div>
					<input type="checkbox" id="coding" onClick={this.togglePinPost.bind(null, post)}/>
					<label>Pin to the top</label>
				</div>
				<PostLink matchUrl={match.url} postId={post.id}>
					<img src={post.image} className="postImg" alt="postImg"/>
				</PostLink>
			</div>
		));
		// create a horizontal scrollist of pinned news
		const pinnedPostsUI = pinnedPosts.map(post => (
			<PostLink matchUrl={match.url} postId={post.id} key={post.id}>
				<div className="pinnedPostContainer">
					<p className="pinnedPostTitle">{post.title}</p>
					<p className="pinnedpPostCategory">{post.category}</p>
					<img src={post.image} className="pinnedPostImg" alt="pinnedPostImg"/>
				</div>
			</PostLink>
		))

    return (
      <div className="Feed">
				{
					!pinnedPosts.length ? null :
					<div>
						<p>pinned:</p>
						<div className="allPinnedPostContainer">
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