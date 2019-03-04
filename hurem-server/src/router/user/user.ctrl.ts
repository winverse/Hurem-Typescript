import { Context } from 'koa';

import { UserProfileMethods, UserMethods } from 'database/models';

const UserProfile = new UserProfileMethods();
const User = new UserMethods();

export default class UserCtrl {
	
	async getProfile(ctx: Context) {
		const { displayname } = ctx.params;
		try {
			const account = await UserProfile.findByDisplayname(displayname);
			
			const count = await User.thoughtCount(account.id);

			if(!account) {
				ctx.status = 404;
				return;
			}

			ctx.body = {
				profile: {
					displayname: account.display_name,
					thumbnail: account.thumbnail
				},
				thoughtCount: count.thoughtCount
			};
		} catch(e) {
			console.log(500, e);
		}
	}

	async getThumbnail (ctx: Context) {
		const { displayname } = ctx. params;

		try {
			const account = await UserProfile.findByDisplayname(displayname);
			
			if(!account) {
				ctx.status = 404;
				return;
			}

			ctx.redirect(account.thumbnail);

		} catch(e) {
			console.log(500, e);
		}
	}

}