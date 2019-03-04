import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { postsActions } from 'store/modules/posts';

import { State } from 'store/modules/index';
import {
	PostList
} from 'components/shared/PostList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type PostListContainerProps = StateProps & DispatchProps;

class PostListContainer extends React.Component<PostListContainerProps> {

	load = async () => {
		const { PostsActions } = this.props;
		PostsActions.loadPost();
	}

	componentDidMount() {
		const { load } = this;
		load();
	}

	public render() {
		const { data } = this.props;
		return (
			<PostList
				posts={data}
			/>
		);
	}
}

const mapStateToProps = ({ posts }: State) => ({
	next: posts.next,
	data: posts.data
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	PostsActions: bindActionCreators(postsActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps 
)(PostListContainer);