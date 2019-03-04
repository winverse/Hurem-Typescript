import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as PostAPI from 'lib/api/posts';

const LOAD_POST = 'posts/LOAD_POST';
const PREFETCH_POST = 'posts/PREFETCH_POST';
const SHOW_PREFETCHED_POST = 'posts/SHOW_PREFETCHED_POST';

export const postsActions = {
	loadPost: createAction<any>(LOAD_POST, PostAPI.list),
	prefetchPost: createAction<any, string>(PREFETCH_POST, PostAPI.next),
	showPrefetchedPost: createAction(SHOW_PREFETCHED_POST)
};

type LoadPostAction = ReturnType<typeof postsActions.loadPost>;
// type PrefetchePostAction = ReturnType<typeof postsActions.prefetchPost>;
// type ShowPrefetchedPostAction = ReturnType<typeof postsActions.showPrefetchedPost>;

export interface PostState {
	next: string;
	data: any[];
	nextData: any[];
}

const initialState: PostState = {
	next: '',
	data: [],
	nextData: []
};
const reducer = handleActions<PostState, any>({
	// [SHOW_PREFETCHED_POST]: (state, action: ShowPrefetchedPostAction) => {
	// 	return produce ((state as any), draft => {
	// 		const nextData = state.nextData;
	// 		return draft.data = state.data.concat(nextData);
	// 	});
	// }
}, initialState);

export default applyPenders(reducer, [
	{
		type: LOAD_POST,
		onSuccess: (state: PostState, action: LoadPostAction) => {
			return produce (state, draft => {
				if(action.payload === undefined) return;
				const { data, next } = action.payload.data;
				draft.data = data;
				draft.next = next;
			});
		}
	}
]);