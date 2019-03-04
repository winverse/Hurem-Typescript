import * as React from 'react';
import HeaderContainer from 'containers/base/HeaderContainer';

import { WritePostContainer } from 'containers/home';
import { PostListContainer } from 'containers/shared/PostList';

import { PageWrapper } from 'components/base/PageWrapper';

class Home extends React.Component {
	render() {
		return (
			<React.Fragment>
				<HeaderContainer/>
				<PageWrapper>
					<WritePostContainer/>
					<PostListContainer/>
				</PageWrapper>
			</React.Fragment>
		);
	}
}

export default Home;