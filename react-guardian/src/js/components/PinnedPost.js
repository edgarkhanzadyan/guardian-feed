import React, { Component } from 'react';
import { PostLink } from '../utils/Utility';


const PinnedPost = class extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    const { post, match, onPostLinkClick } = this.props;
    return (
      <PostLink onClick={onPostLinkClick} matchUrl={match.url} postId={post.id}>
        <div className="pinnedPostContainer">
          <p className="pinnedPostTitle">{post.title}</p>
          <p className="pinnedpPostCategory">{post.category}</p>
          <img src={post.image} className="pinnedPostImg" alt="pinnedPostImg"/>
        </div>
      </PostLink>
    );
  }
}
export default PinnedPost;