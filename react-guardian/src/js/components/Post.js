import React, { Component } from 'react';
import { PostLink } from '../utils/Utility';


const Post = class extends Component {
  constructor(p) {
    super(p);
    this.isPinned = p.isPinned;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.post.pinned !== this.isPinned) {
      this.isPinned = nextProps.post.pinned;
      return true;
    }
    return false;
  }
  render() {
    const { post, match, onPostLinkClick, togglePinPost } = this.props;
    return (
      <div className="postContainer">
        <PostLink onClick={onPostLinkClick} matchUrl={match.url} postId={post.id}>
          <p className="postTitle">{post.title}</p>
        </PostLink>
        <p className="postCategory">{post.category}</p>
        <div>
          <input type="checkbox" id="coding" checked={post.pinned} onChange={togglePinPost.bind(null, post)}/>
          <label>Pin to the top</label>
        </div>
        <PostLink onClick={onPostLinkClick} matchUrl={match.url} postId={post.id}>
          <img src={post.image} className="postImg" alt="postImg"/>
        </PostLink>
      </div>
    );
  }
}
export default Post;