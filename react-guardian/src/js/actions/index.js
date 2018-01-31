export const TOGGLE_REFRESHING = 'TOGGLE_REFRESHING';
export const UPDATE_NEWS_FROM_ABOVE = 'UPDATE_NEWS';
export const UPDATE_NEWS_FROM_BELOW = 'UPDATE_NEWS_FROM_BELOW';
export const ADD_PINNED_POST = 'ADD_PINNED_POST';
export const REMOVE_PINNED_POST = 'REMOVE_PINNED_POST';
export const SET_WINDOW_Y_SCROLL = 'SET_WINDOW_Y_SCROLL';
export const TOGGLE_PINNED_POST_IN_NEWS = 'TOGGLE_PINNED_POST_IN_NEWS';
export function toggleRefreshing(newsAreRefreshing) {
  return { type: TOGGLE_REFRESHING, newsAreRefreshing };
}

export function updateNewsFromAbove(news) {
  return { type: UPDATE_NEWS_FROM_ABOVE, news };
}

export function updateNewsFromBelow(news) {
  return { type: UPDATE_NEWS_FROM_BELOW, news };
}

export function addPinnedPost(pinnedPost) {
  return { type: ADD_PINNED_POST, pinnedPost };
}

export function removePinnedPost(pinnedPost) {
  return { type: REMOVE_PINNED_POST, pinnedPost };
}

export function setWindowYScroll(scrollValue) {
  return { type: SET_WINDOW_Y_SCROLL, scrollValue };
}

export function togglePinnedPostInNews(pinnedPost) {
  return { type: TOGGLE_PINNED_POST_IN_NEWS, pinnedPost };
}
