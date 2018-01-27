import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// css
import '../css/App.css';
// components
import Post from './Post';
// utils
import { getFeed } from './Requests';
import {
	spawnNotification,
	createValidNewsArray
} from './Utility';

const PostLink = ({children, postId, matchUrl}) => (
	<Link to={`${matchUrl}post?id=${postId}`}>
		{children}
	</Link>
);

class Feed extends Component {

	componentDidMount() {
		Notification.requestPermission(); // request permission for sending notifications to the browser
		
		window.addEventListener('scroll', this.onScrollEnd, false);
		const pageFetchingOptions = { pageIndex: this.state.pageToFetch };
		// initial fetch
		this.fetchDataFromGuardian(pageFetchingOptions);
		// fetch news every 30 seconds
		setInterval(
			this.refreshTop,
			 30 * 1000
		);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollEnd, false);
	}
	
	state = {
		news: [],
		isRefreshing: false,
		pageToFetch: 1,
		pinnedPosts: []
	}
	
	onScrollEnd = () => {
		if (
			(window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200) &&
			!this.state.isRefreshing
    ) {
			const { pageToFetch } = this.state;
			const pageFetchingOptions = { pageIndex: pageToFetch };
			// fetch when scroll gets to the end of the page
			this.fetchDataFromGuardian(pageFetchingOptions);
			this.setState({isRefreshing: true});
    }
	}

	refreshTop = async () => {
		const { news } = this.state;
		const fetchedData = await getFeed({ pageIndex: 1 });
		const jsonedData = await fetchedData.json();
		const newsArray = createValidNewsArray(jsonedData.response.results);
		const newsToCompare = news.slice(0, 20);
		// compare last 20 posts with new fetched posts
		const filteredArray = newsArray.filter(newPost => !newsToCompare.some(post => newPost.postDataUrl === post.postDataUrl));
		// spawn notification if there are any new posts
		if (filteredArray.length) {
			spawnNotification(filteredArray[0].title);
		}
		this.setState({
			news: [...filteredArray,...news],
			isRefreshing: false
		});
	}

	fetchDataFromGuardian = async (pageFetchingOptions) => {
		// fetching data from Guardian
		const fetchedData = await getFeed(pageFetchingOptions);
		const jsonedData = await fetchedData.json();
		const newsArray = createValidNewsArray(jsonedData.response.results);
		this.setState({
			news: [...this.state.news, ...newsArray],
			pageToFetch: ++pageFetchingOptions.pageIndex,
			isRefreshing: false
		});
	}

	togglePinPost = toggledPost => {
		const { pinnedPosts } = this.state;
		if(pinnedPosts.some(post => post.id === toggledPost.id)) {
			// filter out the tagged post
			const filteredPinnedPosts = pinnedPosts.filter(post => post.id !== toggledPost.id)
			this.setState({
				pinnedPosts: filteredPinnedPosts
			});
		} else {
			// add the tagged post
			pinnedPosts.push(toggledPost);
			this.setState({
				pinnedPosts
			});
		}
	}

  render() {
		const { match } = this.props;
		const { news, pinnedPosts } = this.state;
		// create a vertical scrollist of news
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
      <div className="App">
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
}
// component-wrapper for Router
class RouterExtendedApp extends Component {
	render() {
		return(
			<Router>
				<div>
					<Route exact path="/" component={Feed}/>
					<Route path="/post" component={Post}/>
				</div>
			</Router>
		)
	}
}

export default RouterExtendedApp;
