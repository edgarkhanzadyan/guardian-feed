import { combineReducers } from 'redux';

import {
  TOGGLE_REFRESHING,
  UPDATE_NEWS_FROM_ABOVE,
  UPDATE_NEWS_FROM_BELOW,
  ADD_PINNED_POST,
  REMOVE_PINNED_POST,
  SET_WINDOW_Y_SCROLL,
  TOGGLE_PINNED_POST_IN_NEWS,
} from '../actions';

const pinnedPosts = (state = [], action) => {
  switch (action.type) {
  case REMOVE_PINNED_POST:
    return state.filter(post => post.id !== action.pinnedPost.id);
  case ADD_PINNED_POST:
    return [ ...state, action.pinnedPost ];
  default:
    return state;
  }
};

const newsAreRefreshing = (state = false, action) => {
  switch (action.type) {
  case TOGGLE_REFRESHING:
    return action.newsAreRefreshing;
  default:
    return state;
  }
};

const news = (state = [], action) => {
  switch (action.type) {
  case UPDATE_NEWS_FROM_ABOVE: {
    const first10news = state.slice(0, 10);
    // compare last 10 posts with new fetched posts
    const filteredArray1 = action.news.filter(newPost =>
      !first10news.some(post => newPost.id === post.id));

    return [ ...filteredArray1, ...state ];
  }
  case UPDATE_NEWS_FROM_BELOW: {
    const last10news = state.slice(state.length - 10);
    const filteredArray2 = action.news.filter(newPost =>
      !last10news.some(post => newPost.id === post.id));
    console.log(filteredArray2);
    return [ ...state, ...filteredArray2 ];
  }
  case TOGGLE_PINNED_POST_IN_NEWS: {
    const postInNews = state.find(post => post.id === action.pinnedPost.id);
    postInNews.pinned = !postInNews.pinned;
    return [ ...state ];
  }
  default:
    return state;
  }
};

const windowYScrollValue = (state = 0, action) => {
  switch (action.type) {
  case SET_WINDOW_Y_SCROLL:
    return action.scrollValue;
  default:
    return state;
  }
};

const guardianApp = combineReducers({
  news,
  newsAreRefreshing,
  pinnedPosts,
  windowYScrollValue,
});

export default guardianApp;
