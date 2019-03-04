import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { toast } from 'react-toastify';

import { homeActions } from 'store/modules/home';

import { State } from 'store/modules/index';
import { 
	WritePost
} from 'components/home/WritePost';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type WritePostContainerProps = StateProps & DispatchProps;

class WritePostContainer extends React.Component<WritePostContainerProps> {

	handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { HomeActions } = this.props;
		const { value } = e.target;
		HomeActions.changeWritePostInput(value);
	}

	message = (message: string) => {
		return <div style={{ fontSize: '1.1rem' }}>{message}</div>;
	}

	handlePost = async () => {
		const { message } = this; 
		const { HomeActions, value } = this.props;
		
		if(value.length < 5) {
			HomeActions.changeWritePostInput('');
			return toast(message('너무 짧습니다 5자 이상 입력해주세요'), { type: 'error' });
		}

		if(value.length > 1000) {
			HomeActions.changeWritePostInput('');
			return toast(message('최대 1000자까지 입력 할 수 있습니다.'), { type: 'error' });
		}

		try {
			await HomeActions.writePost(value);
			await HomeActions.changeWritePostInput('');
			toast(message('생각이 작성 되었습니다.'), { type: 'success' });
		} catch (e) {
			console.log(e);
			toast(message('오류가 발생했습니다'), { type: 'error' });
		}
		return;
	}

	public handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>): void => {
		e.preventDefault();
	}

	public render() {
		const { handleChange, handlePost, handlePaste } = this;
		const { value } = this.props;
		return (
			<WritePost
				value={value}
				onChange={handleChange}
				onPost={handlePost}
				onPaste={handlePaste}
			/>
		);
	}
}

const mapStateToProps = ({ home }: State) => ({
	value: home.writePost.value
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	HomeActions: bindActionCreators(homeActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps 
)(WritePostContainer);