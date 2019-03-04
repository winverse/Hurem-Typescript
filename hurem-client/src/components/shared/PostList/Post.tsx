import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import * as moment from 'moment';
import 'moment/locale/ko';

import { media, shadow } from 'style/styleUtils';

interface StyledProps {
	image: string;
}

const Wrapper = styled.div`
	width: calc((100% - 32px) / 3);
	@media ${media.laptop} {
		width: calc((100% - 16px) / 2);
	}
	@media ${media.tablet} {
		width: 100%;
	}
	height: 400px;
	margin-bottom: 1rem;
	background: white;
	${shadow(0)};
`;

const PostHead = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid ${oc.gray[2]};
`;

const UserThumbnail = styled.div`
	${(props: StyledProps) => {
		return css`
			background: ${oc.gray[2]};
			background-image: url('${props.image}');
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			width: 32px;
			height: 32px;
			border-radius: 50%;
		`;
	}};
`;

const Displayname = styled.div`
	font-weight: 500;
	margin-left: 0.3rem;
	font-size: 0.9rem;
`;

const Count = styled.div`
	color: ${oc.gray[4]};
	margin-left: 0.3rem;
	font-size: 0.8rem;
`;

const Time = styled.div`
	color: ${oc.gray[4]};
	font-size: 0.8rem;
	margin-left: auto;
`;

const Content = styled.div`
	font-size: 1.25rem;
	color: ${oc.gray[8]};
	font-weight: 300;
	padding: 1rem;
	word-break: break-all;
	white-space: pre-wrap;
`;

interface PostProps {
	post: any;
}

const Post: React.SFC<PostProps> = ({ post }) => {
	const { 
		count,
		displayname,
		content,
		createdAt
	} = post;

	return(
		<Wrapper>
			<PostHead>
				<UserThumbnail image={`/api/user/${displayname}/thumbnail`}/>
				<Displayname>{displayname}</Displayname>
				<Count>#{count}번째 생각</Count>
				<Time>{moment(createdAt).fromNow()}</Time>
			</PostHead>
			<Content>
				{content}
			</Content>
		</Wrapper>
	);
};

export default Post;