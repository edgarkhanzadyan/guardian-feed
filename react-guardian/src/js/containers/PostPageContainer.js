import { connect } from 'react-redux';
import PostPage from '../components/PostPage';

const mapStateToProps = state => ({
  news: state.news,
});

const PostPageContainer = connect(mapStateToProps)(PostPage);

export default PostPageContainer;
