import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// css
import '../../css/PostPage.css';

class PostPage extends Component {
  componentWillMount() {
    const { news } = this.props;
    // get vars from url params
    const urlSearchParams = new URLSearchParams(window.location.search);
    const postId = urlSearchParams.get('id');
    this.post = news.find(p => p.id === postId);
  }

  post = {};
  render() {
    const { post } = this;
    return (
      <div>
        <Link to='/'>
          <p className='GoBackButton'>Go Back</p>
        </Link>
        <div className='postContainer' key={post.id}>
          <p className='postTitle'>{post.title}</p>
          <p className='postCategory'>{post.category}</p>
          <img src={post.image} className='postImg' alt='postImg' />
        </div>
      </div>
    );
  }
}

export default PostPage;
