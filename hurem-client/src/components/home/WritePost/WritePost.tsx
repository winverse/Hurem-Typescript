import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Textarea from 'react-textarea-autosize';

import { shadow, media } from 'style/styleUtils';
import Progress from './Progress';

const Wrapper = styled.div`
	position: relative;
	width: 760px;
	margin: 0 auto;
	padding: 1rem;
	background: ${oc.gray[7]};
	${shadow(1)}
	@media ${media.laptopL} {
		width: 736px;
	}
	@media ${media.tablet} {
		width: 100%;
	}
`;

const StyledTextarea = styled(Textarea)`
	width: 100%;
	background: transparent;
	border: none;
	resize: none;
	outline: none;
	font-size: 1.5rem;
	color: white;
	
	&::placeholder {
		color: ${oc.gray[3]};
	}

	@media ${media.tablet} {
		font-size: 1rem;
	}
`;

interface WritePostProps {
	value: string;
	onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
	onPost(): void;
	onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>): void;
}

const WritePost: React.SFC<WritePostProps> = ({ onChange, value, onPost, onPaste }) => (
	<Wrapper> 
		<StyledTextarea 
			minRows={3}
			maxRows={10} 
			placeholder={`의식의 흐름대로 당신의 생각을 적어보세요.\n5초이상 아무것도 입력하지 않으면 자동으로 포스팅됩니다.`}
			value={value}
			onChange={onChange}
			onPaste={onPaste}
		/>
		<Progress onPost={onPost} value={value}/>
	</Wrapper>
);

export default WritePost;