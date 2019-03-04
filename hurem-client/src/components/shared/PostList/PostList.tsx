import * as React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

import Post from './Post';

const Wrapper = styled.div`
	position: relative;
	margin-top: 1rem;
`;

interface PostListProps {
	posts: any;
}

const PostList: React.SFC<PostListProps> = ({ posts }) => {
	const postList = posts.map(
		(post: any) => (
			<Post key={post.id} post={post}/>
		)
	);

	return (
		<Wrapper>
		<Masonry options={{ gutter: 16 }}>
			{postList}
		</Masonry>
	</Wrapper>
	);
};

export default PostList;