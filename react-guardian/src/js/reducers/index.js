import { combineReducers } from 'redux';

import {
  TOGGLE_REFRESHING,
  UPDATE_NEWS_FROM_ABOVE,
  UPDATE_NEWS_FROM_BELOW,
  ADD_PINNED_POST,
  REMOVE_PINNED_POST
} from '../actions';

const pinnedPosts = (state = [], action) => {
  
  switch (action.type) {
    case REMOVE_PINNED_POST:
      const filteredPinnedPosts = state.filter(post => post.id !== action.pinnedPost.id);
      return filteredPinnedPosts;
    case ADD_PINNED_POST:
      return [...state, action.pinnedPost];
    default:
      return state;
  }
}

const newsAreRefreshing = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_REFRESHING:
      return action.newsAreRefreshing
    default:
      return state;
  }
}

const news = (state = [], action) => {
  switch (action.type) {
    case UPDATE_NEWS_FROM_ABOVE:
      const newsToCompare = action.news.slice(0, 10);
      // compare last 10 posts with new fetched posts
      const filteredArray = action.news.filter(newPost => !newsToCompare.some(post => newPost.postDataUrl === post.postDataUrl));
      // spawn notification if there are any new posts
      // console.log(filteredArray.length);
      // if (filteredArray.length) {
      //   spawnNotification(filteredArray[0].title);
      // }
      return [...filteredArray, ...state];
    case UPDATE_NEWS_FROM_BELOW:
      return [...state, ...action.news];
    default:
      return state;
  }
}
const guardianApp = combineReducers({
  news,
  newsAreRefreshing,
  pinnedPosts
});
export default guardianApp