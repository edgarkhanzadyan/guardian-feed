import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// css
import '../../css/Post.css';
// utils
import {
	createValidPostObject
} from '../utils/Utility';
import { getPostData } from '../utils/Requests';

class Post extends Component {

  state = {
		post: {}
	}

	componentDidMount() {
		this.fetchPostData();
	}

	fetchPostData = async () => {
    try {
      console.log(this.props);
      // get vars from url params
      const urlSearchParams = new URLSearchParams(window.location.search);
      const postId = urlSearchParams.get('id');
      // get post data from Guardian 
      const fetchedData = await getPostData({ postId });
      const {response: { content }} = await fetchedData.json();
      const post = createValidPostObject(content);
      this.setState({ post });
    } catch(e) {
      console.log(e);
    }
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