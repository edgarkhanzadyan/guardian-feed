import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
// css
import '../../css/Feed.css';
// components
import PostPageContainer from '../containers/PostPageContainer';
import FeedContainer from '../containers/FeedContainer';

// component-wrapper for Router
class App extends Component {
	render() {
		return(
			<Router>
				<div>
					<Route exact path="/" component={FeedContainer}/>
					<Route path="/post" component={PostPageContainer}/>
				</div>
			</Router>
		)
	}
}

export default App;
