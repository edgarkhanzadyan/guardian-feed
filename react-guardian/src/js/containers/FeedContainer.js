import { connect } from 'react-redux';
import {
  updateNewsFromAbove,
  updateNewsFromBelow,
  toggleRefreshing,
  addPinnedPost,
  removePinnedPost,
  setWindowYScroll,
  togglePinnedPostInNews,
} from '../actions';
import Feed from '../components/Feed';

// { news, newsAreRefreshing, pinnedPosts }
const mapStateToProps = state => state;

const mapDispatchToProps = {
  updateNewsFromAbove,
  updateNewsFromBelow,
  toggleRefreshing,
  addPinnedPost,
  removePinnedPost,
  setWindowYScroll,
  togglePinnedPostInNews,
};

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);

export default FeedContainer;
