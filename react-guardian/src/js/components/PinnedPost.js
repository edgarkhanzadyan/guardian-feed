import React from 'react';
import { PostLink } from '../utils/Utility';

const PinnedPost = ({post, match, onPostLinkClick}) =>
  <PostLink onClick={onPostLinkClick} matchUrl={match.url} postId={post.id}>
    <div className="pinnedPostContainer">
      <p className="pinnedPostTitle">{post.title}</p>
      <p className="pinnedpPostCategory">{post.category}</p>
      <img src={post.image} className="pinnedPostImg" alt="pinnedPostImg"/>
    </div>
  </PostLink>;

export default PinnedPost;