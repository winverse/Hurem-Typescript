import * as Router from 'koa-router';

import auth from './auth';
import posts from './posts';
import user from './user';

export class ApiRouter {
	api: Router;

	constructor() {
		this.api = new Router();
		this.routes();
	}

	routes(): void {
		const { api } = this;
		api.use('/auth', auth.routes());
		api.use('/posts', posts.routes());
		api.use('/user', user.routes());
	}
}

const apiRoute = new ApiRouter();
const api = apiRoute.api;

export default api;