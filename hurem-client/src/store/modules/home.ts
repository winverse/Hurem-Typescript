import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as PostAPI from 'lib/api/posts';

const CHAGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT';
const WRITE_POST = 'home/WRITE_POST';

export const homeActions = {
	changeWritePostInput: createAction<string, string>(CHAGE_WRITE_POST_INPUT, value => value),
	writePost: createAction<any, any>(WRITE_POST, PostAPI.write)
};

type ChangeWritePostInputAction = ReturnType<typeof homeActions.changeWritePostInput>;
type WritePostAction = ReturnType<typeof homeActions.writePost>;

export interface HomeState {
	writePost: {
		value: string
	};
}

const initialState: HomeState = {
	writePost: {
		value: ''
	}
};

const reducer = handleActions<HomeState, any>({
	[CHAGE_WRITE_POST_INPUT]: (state, action: ChangeWritePostInputAction) => {
		return produce (state, draft => {
			if(action.payload === undefined) return;
			draft.writePost.value = action.payload;
		});
	}
}, initialState);

export default applyPenders(reducer, [
	{
		type: WRITE_POST,
		onPending: (state: HomeState, action: WritePostAction) => {
			return produce (state, draft => initialState);
		}
	}
]);