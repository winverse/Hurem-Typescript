import * as Router from 'koa-router';

import UserCtrl from './user.ctrl';

const userCtrl = new UserCtrl();

// path: /api/user

export class UserRouter {
	user: Router = new Router();

	constructor() {
		this.routes();
	}

	routes(): void {
		const { user } = this;
		user.get('/:displayname', userCtrl.getProfile);
		user.get('/:displayname/thumbnail', userCtrl.getThumbnail);
	}
}

const userRouter = new UserRouter();
const user = userRouter.user;

export default user;