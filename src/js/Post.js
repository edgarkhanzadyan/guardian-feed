import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// css
import '../css/Post.css';
// utils
import {
	createValidPostObject
} from './Utility';
import { getPostData } from './Requests';

class Post extends Component {

	componentDidMount() {
		this.fetchPostData();
	}

	state = {
		post: {}
	}

	fetchPostData = async () => {
		// get vars from url params
		const urlSearchParams = new URLSearchParams(window.location.search);
		const postId = urlSearchParams.get('id');
		const postFetchingOptions = { postId };
		// get post data from Guardian 
		const fetchedData = await getPostData(postFetchingOptions);
		const jsonedData = await fetchedData.json();
		const post = createValidPostObject(jsonedData.response.content);
		this.setState({ post });
	}

	render() {
		const { post } = this.state;
		return (
			<div>
				<Link to="/">
					<p className="GoBackButton">Go Back</p>
				</Link>
				<div className="postContainer" key={post.id}>
					<p className="postTitle">{post.title}</p>
					<p className="postCategory">{post.category}</p>
					<img src={post.image} className="postImg" alt="postImg"/>
				</div>
			</div>
		)
	}
}

export default Post;