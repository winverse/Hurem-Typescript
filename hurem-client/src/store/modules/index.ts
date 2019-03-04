/* tslint:disable */
import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import base, { BaseState } from './base';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';
import home, { HomeState } from './home';
import posts, { PostState } from './posts';

export default combineReducers({
	base,
	auth,
	user,
	home,
	posts,
	pender
});

export interface State {
	base: BaseState;
	auth: AuthState;
	user: UserState;
	home: HomeState;
	posts: PostState;
}