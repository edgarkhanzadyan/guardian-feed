import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import { IMAGE_PLACEHOLDER } from './Constants';

export const createValidPostObject = post => ({
  id: post.id,
  pinned: false,
  uuid: uuid(),
  title: post.webTitle,
  category: post.sectionName,
  image: (post.fields && post.fields.thumbnail) ? post.fields.thumbnail : IMAGE_PLACEHOLDER,
  postDataUrl: post.apiUrl,
});

export const createValidNewsArray = news =>
  news.map(createValidPostObject);

export const spawnNotification = (body) => {
  const options = { body };
  new Notification('New Post', options);
};

export const PostLink = ({
  children,
  postId,
  matchUrl,
  onClick,
}) => (
  <Link onClick={onClick} to={`${matchUrl}post?id=${postId}`}>
    {children}
  </Link>
);
